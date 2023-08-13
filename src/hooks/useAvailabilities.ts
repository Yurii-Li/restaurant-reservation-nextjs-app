import { useState } from "react";
import axios from "axios";
import { Time } from "@/utils/convertToDisplayTime";

export default function useAvailabilities() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{ time: Time; available: boolean }[] | null>(
    null,
  );

  const fetchAvailabilities = async ({
    slug,
    day,
    time,
    partySize,
  }: {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  }) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/restaurant/${slug}/availability`, {
        params: {
          day,
          time,
          partySize,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      if (axios.isAxiosError(e) && e.response) {
        setError(e.response.data.errorMessage);
      } else {
        setError(String(e));
      }
    }
  };

  return {
    loading,
    error,
    data,
    fetchAvailabilities,
  };
}
