import { NextRequest, NextResponse } from "next/server";
import { times } from "@/data/times";

export async function GET(req: NextRequest) {
  const slug = req.nextUrl.pathname.split("/")[3];
  const day = req.nextUrl.searchParams.get("day");
  const time = req.nextUrl.searchParams.get("time");
  const partySize = req.nextUrl.searchParams.get("partySize");

  if (!day || !time || !partySize) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  const searchTimes = times.find((t) => {
    return t.time === time;
  })?.searchTimes;

  if (!searchTimes) {
    return NextResponse.json(
      { errorMessage: "Invalid data provided" },
      { status: 400 }
    );
  }

  return NextResponse.json({ searchTimes }, { status: 200 });
}

//http://localhost:3000/api/restaurant/vivaan-fine-indian-cuisine-ottawa/availability?day=2023-02-03&time=15:00:00.000Z&partySize=8

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
