import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { findAvailableTables } from "@/services/restaurant/findAvailableTables";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
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

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 },
    );
  }

  const searchTimesWithTables =  await findAvailableTables({
    time,
    day,
    restaurant
  });


  if (!Array.isArray(searchTimesWithTables)) {
    return
  }


  const availabilities = searchTimesWithTables
    .map((t) => {
      const sumSeats = t.tables.reduce((acc, table) => {
        return acc + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeats >= parseInt(partySize),
      };
    })
    .filter((availability) => {
      const timeIsAfterOpeningHours =
        new Date(`${day}T${availability.time}`) >=
        new Date(`${day}T${restaurant.open_time}`);

      const timeIsBeforeClosingHours =
        new Date(`${day}T${availability.time}`) <=
        new Date(`${day}T${restaurant.close_time}`);

      return timeIsAfterOpeningHours && timeIsBeforeClosingHours;
    });

  return NextResponse.json(availabilities, { status: 200 });
}

//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-06-07&time=14:00:00.000Z&partySize=8

// ПОМИЛКИ: HTTP ERROR 500. req.query = undefined  В НАСЛІДОК ЦЬОГО TypeError: Cannot destructure property 'slug' of 'req.query' as it is undefined.
// export async function GET(req: NextApiRequest) {
//
//   // Чому req.query повертає undefined?
//   console.log("req.query", req.query );
//
//   const {slug, day, time, partySize} = req.query as {slug: string, day: string, time: string, partySize: string};
//
//   if (!day || !time || !partySize) {
//     return NextResponse.json({ errorMessage: "Invalid data provided" }, { status: 400 });
//   }
//
//   return NextResponse.json( { slug, day, time, partySize }, { status: 200 });
// }
