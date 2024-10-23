import { useQuery } from "@tanstack/react-query";
import { fetchPersonStarships } from "../services/api";
import { getStarshipsResponse } from "@/types/types";

export const usePersonStarships = (starshipIds: number[]) => {
  return useQuery<getStarshipsResponse, Error>({
    queryKey: ["personStarships", starshipIds],
    queryFn: () => fetchPersonStarships(starshipIds),
    enabled: starshipIds.length > 0, // Only fetch if starshipIds are provided
  });
};
