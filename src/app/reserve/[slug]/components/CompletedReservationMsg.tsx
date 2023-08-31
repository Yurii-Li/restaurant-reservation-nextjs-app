import { format } from "date-fns";

import { convertToDisplayTime, Time } from "@/utils/convertToDisplayTime";

interface IProps {
  day: string;
  time: string;
}

export default function CompletedReservationMsg({ day, time }: IProps) {
  return (
    <div
      className={
        "flex justify-center items-center w-full border-2 rounded min-h-[100px]"
      }
    >
      <div>
        <h1 className={"text-2xl text-center font-bold"}>You're all set!</h1>
        <p className={"mt-2"}>
          See you on{" "}
          <span className={"font-bold"}>{format(new Date(day), "PPP")} </span>{" "}
          at{" "}
          <span className={"font-bold"}>
            {convertToDisplayTime(time as Time)}
          </span>
        </p>
      </div>
    </div>
  );
}
