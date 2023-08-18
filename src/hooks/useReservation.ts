import { useState } from "react";
import axios from "axios";

export default function useReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async ({
    slug,
    partySize,
    day,
    time,
    bookerFirstName,
    bookerLastName,
    bookerPhone,
    bookerEmail,
    bookerOccasion,
    bookerRequest,
    setDidBook,
  }: {
    slug: string;
    partySize: string;
    day: string;
    time: string;
    bookerFirstName: string;
    bookerLastName: string;
    bookerPhone: string;
    bookerEmail: string;
    bookerOccasion: string;
    bookerRequest: string;
    setDidBook: (didBook: boolean) => void;
  }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/api/restaurant/${slug}/reserve`,
        {
          bookerFirstName,
          bookerLastName,
          bookerPhone,
          bookerEmail,
          bookerOccasion,
          bookerRequest,
        },
        {
          params: {
            day,
            time,
            partySize,
          },
        },
      );

      setLoading(false);
      setDidBook(true);
      return response.data;
    } catch (e) {
      setLoading(false);
      if (axios.isAxiosError(e) && e.response) {
        setError(e.response.data.errorMessage);
      } else {
        setError(String(e));
      }
    }
  };

  return { loading, error, createReservation };
}
