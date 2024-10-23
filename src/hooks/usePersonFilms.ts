import { useQuery } from "@tanstack/react-query";
import { fetchPersonFilms } from "../services/api";
import { getFilmsResponse } from "@/types/types";

export const usePersonFilms = (personId: string) => {
  return useQuery<getFilmsResponse, Error>({
    queryKey: ["personFilms", personId],
    queryFn: () => fetchPersonFilms(personId),
    enabled: !!personId, // Only fetch if personId is available
  });
};
