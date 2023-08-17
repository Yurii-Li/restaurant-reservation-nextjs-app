import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";
import validator from "validator";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/")[3];
  const day = req.nextUrl.searchParams.get("day");
  const time = req.nextUrl.searchParams.get("time");
  const partySize = req.nextUrl.searchParams.get("partySize");

  if (!day || !time || !partySize) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 },
    );
  }

  const {
    bookerEmail,
    bookerPhone,
    bookerFirstName,
    bookerLastName,
    bookerOccasion,
    bookerRequest,
  } = await req.json();

  const errors: string[] = [];

  const validationSchema = [
    {
      valid: validator.isEmail(bookerEmail),
      errorMessage: "Email is not valid",
    },
    {
      valid: validator.isLength(bookerPhone, { min: 1 }),
      errorMessage: "Phone is not valid",
    },
    {
      valid: validator.isLength(bookerFirstName, { min: 1 }),
      errorMessage: "First name is not valid",
    },
    {
      valid: validator.isLength(bookerLastName, { min: 1 }),
      errorMessage: "Last name is not valid",
    },
    {
      valid: bookerOccasion
        ? validator.isLength(bookerOccasion, { min: 1 })
        : true,
      errorMessage: "Occasion is not valid",
    },
    {
      valid: bookerRequest
        ? validator.isLength(bookerRequest, { min: 1 })
        : true,
      errorMessage: "Request is not valid",
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors.push(check.errorMessage);
    }
  });

  if (errors.length > 0) {
    return NextResponse.json({ errorMessage: errors[0] }, { status: 400 });
  }

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Restaurant not found" },
      { status: 400 },
    );
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      { errorMessage: "Restaurant is closed at this time" },
      { status: 400 },
    );
  }

  const searchTimesWithTables = await findAvailableTables({
    time,
    day,
    restaurant,
  });

  if (!Array.isArray(searchTimesWithTables)) {
    return;
  }

  const searchTimeWithTables = searchTimesWithTables.find((t) => {
    return t.date.toISOString() === `${day}T${time}`;
  });

  if (!searchTimeWithTables) {
    return NextResponse.json(
      { errorMessage: "No availability, cannot book" },
      { status: 400 },
    );
  }

  const tablesCount: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables.tables.forEach((table) => {
    if (table.seats === 2) {
      tablesCount[2].push(table.id);
    } else {
      tablesCount[4].push(table.id);
    }
  });

  const tablesToBooks: number[] = [];
  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tablesCount[4].length) {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      } else {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      }
    } else {
      if (tablesCount[2].length) {
        tablesToBooks.push(tablesCount[2][0]);
        tablesCount[2].shift();
        seatsRemaining = seatsRemaining - 2;
      } else {
        tablesToBooks.push(tablesCount[4][0]);
        tablesCount[4].shift();
        seatsRemaining = seatsRemaining - 4;
      }
    }
  }

  const booking = await prisma.booking.create({
    data: {
      number_of_people: parseInt(partySize),
      booking_time: new Date(`${day}T${time}`),
      booker_email: bookerEmail,
      booker_phone: bookerPhone,
      booker_first_name: bookerFirstName,
      booker_last_name: bookerLastName,
      booker_occasion: bookerOccasion,
      booker_request: bookerRequest,
      restaurant_id: restaurant.id,
    },
  });

  const bookingOnTablesData = tablesToBooks.map((tableId) => {
    return {
      booking_id: booking.id,
      table_id: tableId,
    };
  });

  await prisma.bookingOnTables.createMany({
    data: bookingOnTablesData,
  });

  return NextResponse.json(booking, { status: 200 });
}
