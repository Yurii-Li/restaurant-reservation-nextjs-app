"use client";

import Image from "next/image";

import errorMascot from "../../public/icons/error.png";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.error(error);

  return (
    <div
      className={
        "h-screen bg-gray-200 flex flex-col justify-center items-center"
      }
    >
      <Image src={errorMascot} alt={"error"} className={"w-56 mb-8"} />
      <div
        className={
          "bg-white px-9 py-14 shadow rounded flex flex-col items-center"
        }
      >
        <h3 className={"text-3xl font-bold"}>
          Well, this is embarrassing. Something went wrong.
        </h3>
        <button
          onClick={() => reset()}
          className={"text-2xl font-bold text-blue-500  hover:text-blue-700"}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
