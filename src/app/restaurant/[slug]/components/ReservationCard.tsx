"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import { partySize as partySizes, times } from "@/data";
import useAvailabilities from "@/hooks/useAvailabilities";

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
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          className="py-3 border-b font-light"
          id=""
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
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            onChange={handleChangeDate}
            className={"py-3 border-b font-light text-reg w-full"}
            dateFormat={"dd/MMMM"}
            wrapperClassName={"w-[48%]"}
          />
        </div>

        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
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
        >
          Find a Time
        </button>
      </div>
    </div>
  );
}
