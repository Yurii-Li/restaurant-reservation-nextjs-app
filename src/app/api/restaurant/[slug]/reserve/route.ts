import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/")[3];
  const day = req.nextUrl.searchParams.get("day");
  const time = req.nextUrl.searchParams.get("time");
  const partySize = req.nextUrl.searchParams.get("partySize");

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    }
  });

  if (!restaurant) {
    return NextResponse.json(
      { errorMessage: "Restaurant not found" },
      { status: 400 }
    );
  }

  if(
    new Date(`${day}T${time}`) <  new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) >  new Date(`${day}T${restaurant.close_time}`)
  ) {
    return NextResponse.json(
      { errorMessage: "Restaurant is closed at this time" },
      { status: 400 }
    );
  }


  return NextResponse.json({
    slug,
    day,
    time,
    partySize,
  });
}
