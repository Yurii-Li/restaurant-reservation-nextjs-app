"use client";

import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";

import useReservation from "@/hooks/useReservation";
import { Spinner } from "@/app/components";
import CompletedReservationMsg from "@/app/reserve/[slug]/components/CompletedReservationMsg";
import { IReserveFormInputs } from "@/interfaces/reserve.interface";
import { reserveValidator } from "@/validators/reserve.validator";
import { AuthenticationContext } from "@/app/context/AuthContext";

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
  const [didBook, setDidBook] = useState(false);

  const { loading, error: apiError, createReservation } = useReservation();

  const { data: me } = useContext(AuthenticationContext);

  const handleClick: SubmitHandler<IReserveFormInputs> = async (data) => {
    await createReservation({
      slug,
      partySize,
      day,
      time,
      ...data,
      setDidBook,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IReserveFormInputs>({
    mode: "all",
    resolver: joiResolver(reserveValidator),
    defaultValues: {
      bookerFirstName: me?.firstName || "",
      bookerLastName: me?.lastName || "",
      bookerEmail: me?.email || "",
      bookerPhone: me?.phone || "",
    },
  });

  return (
    <div className="mt-10 mx-auto w-[660px]">
      {didBook ? (
        <CompletedReservationMsg day={day} time={time} />
      ) : (
        <form
          className={"flex flex-wrap justify-between"}
          onSubmit={handleSubmit(handleClick)}
        >
          <div className={"mb-2"}>
            <input
              type="text"
              className="border rounded p-3 w-80"
              placeholder="First name"
              {...register("bookerFirstName")}
            />
            {errors.bookerFirstName && (
              <div className={"text-red-500 text-sm"}>
                {errors.bookerFirstName.message}
              </div>
            )}
          </div>
          <div className={"mb-2"}>
            <input
              type="text"
              className="border rounded p-3 w-80"
              placeholder="Last name"
              {...register("bookerLastName")}
            />
            {errors.bookerLastName && (
              <div className={"text-red-500 text-sm"}>
                {errors.bookerLastName.message}
              </div>
            )}
          </div>
          <div className={"mb-2"}>
            <input
              type="text"
              className="border rounded p-3 w-80"
              placeholder="Phone number"
              {...register("bookerPhone")}
            />
            {errors.bookerPhone && (
              <div className={"text-red-500 text-sm"}>
                {errors.bookerPhone.message}
              </div>
            )}
          </div>
          <div className={"mb-2"}>
            <input
              type="text"
              className="border rounded p-3 w-80"
              placeholder="Email"
              {...register("bookerEmail")}
            />
            {errors.bookerEmail && (
              <div className={"text-red-500 text-sm"}>
                {errors.bookerEmail.message}
              </div>
            )}
          </div>
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
            {...register("bookerOccasion")}
          />
          <input
            type="text"
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
            {...register("bookerRequest")}
          />
          <button
            className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
            disabled={!isValid || loading}
          >
            {loading ? <Spinner /> : "Complete reservation"}
          </button>
          <p className="mt-4 text-sm">
            By clicking “Complete reservation” you agree to the OpenTable Terms
            of Use and Privacy Policy. Standard text message rates may apply.
            You may opt out of receiving text messages at any time.
          </p>
        </form>
      )}

      {apiError && (
        <div className={"bg-red-500 text-white text-sm p-2 rounded  mt-5"}>
          !!! {apiError}
        </div>
      )}
    </div>
  );
}
