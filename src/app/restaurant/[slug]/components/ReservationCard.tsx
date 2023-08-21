"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { partySize as partySizes, times } from "@/data";
import useAvailabilities from "@/hooks/useAvailabilities";
import { Spinner } from "@/app/components";
import Link from "next/link";
import { convertToDisplayTime } from "@/utils/convertToDisplayTime";

export function ReservationCard({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const { error, loading, data, fetchAvailabilities } = useAvailabilities();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(new Date().toISOString().split("T")[0]);

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split("T")[0]);
      return setSelectedDate(date);
    }

    return setSelectedDate(null);
  };

  return (
    <div className="fixed w-[15%] min-w-[240px] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="partySize">Party size</label>
        <select
          className="py-3 border-b font-light"
          id="partySize"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
        >
          {partySizes.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="date">Date</label>
          <DatePicker
            id={"date"}
            selected={selectedDate}
            onChange={handleChangeDate}
            className={"py-3 border-b font-light text-reg w-full"}
            dateFormat={"dd/MMMM"}
            wrapperClassName={"w-[48%]"}
          />
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="time">Time</label>
          <select
            id="time"
            className="py-3 border-b font-light"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {times.map(({ time, displayTime }) => {
              if (time >= openTime && time <= closeTime) {
                return (
                  <option key={time} value={time}>
                    {displayTime}
                  </option>
                );
              }
            })}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={() =>
            fetchAvailabilities({
              slug,
              day,
              time,
              partySize,
            })
          }
          disabled={loading}
        >
          {loading ? <Spinner /> : "Find a Table"}
        </button>
      </div>
      {data && data.length ? (
        <div className={"mt-4"}>
          <p className={"text-reg"}>Select a Time</p>
          <div className="grid grid-cols-2 mt-2 gap-2 ">
            {data.map((time, index) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className={
                    "bg-red-600 cursor-pointer p-2 text-center text-white rounded "
                  }
                  key={index}
                >
                  <p className={"text-sm font-bold"}>
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>
              ) : (
                <p className={"bg-gray-300 p-2 rounded"} key={index}></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
