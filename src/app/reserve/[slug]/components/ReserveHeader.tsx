import { convertToDisplayTime, Time } from "@/utils/convertToDisplayTime";
import { format } from "date-fns";

export function ReserveHeader({
  image,
  name,
  date,
  time,
  partySize,
}: {
  image: string;
  name: string;
  date: string;
  time: string;
  partySize: string;
}) {
  return (
    <div className={"mx-auto w-[660px]"}>
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img src={image} alt={name} className="w-32 h-18 rounded" />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{format(new Date(date), "PP")}</p>
            <p className="mr-6">{convertToDisplayTime(time as Time)}</p>
            <p className="mr-6">
              {partySize} {parseInt(partySize) === 1 ? "person" : "people"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
