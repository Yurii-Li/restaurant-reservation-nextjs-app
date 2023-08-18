"use client";

import { ChangeEvent, useEffect, useState } from "react";
import useReservation from "@/hooks/useReservation";
import { Spinner } from "@/app/components";
import CompletedReservationMsg from "@/app/reserve/[slug]/components/CompletedReservationMsg";

export function ReserveForm({
  slug,
  day,
  time,
  partySize,
}: {
  slug: string;
  day: string;
  time: string;
  partySize: string;
}) {
  const [inputs, setInputs] = useState({
    bookerEmail: "",
    bookerPhone: "",
    bookerFirstName: "",
    bookerLastName: "",
    bookerOccasion: "",
    bookerRequest: "",
  });

  const [disabled, setDisabled] = useState(true);
  const [didBook, setDidBook] = useState(false);

  const { loading, error, createReservation } = useReservation();

  const handleClick = async () => {
    await createReservation({
      slug,
      partySize,
      day,
      time,
      ...inputs,
      setDidBook,
    });
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      inputs.bookerEmail &&
      inputs.bookerPhone &&
      inputs.bookerFirstName &&
      inputs.bookerLastName
    ) {
      return setDisabled(false);
    }

    return setDisabled(true);
  }, [inputs]);

  return (
    <div className="mt-10 mx-auto flex flex-wrap justify-between w-[660px]">
      {didBook ? (
        <CompletedReservationMsg day={day} time={time} />
      ) : (
        <>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
            name={"bookerFirstName"}
            onChange={handleChangeInput}
            value={inputs.bookerFirstName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
            name={"bookerLastName"}
            onChange={handleChangeInput}
            value={inputs.bookerLastName}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
            name={"bookerPhone"}
            onChange={handleChangeInput}
            value={inputs.bookerPhone}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
            name={"bookerEmail"}
            onChange={handleChangeInput}
            value={inputs.bookerEmail}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            name={"bookerOccasion"}
            onChange={handleChangeInput}
            value={inputs.bookerOccasion}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            name={"bookerRequest"}
            onChange={handleChangeInput}
            value={inputs.bookerRequest}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={disabled || loading}
            onClick={handleClick}
          >
            {loading ? <Spinner /> : "Complete reservation"}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </>
      )}
    </div>
  );
}
