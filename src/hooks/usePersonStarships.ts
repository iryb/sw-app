import { useQuery } from "@tanstack/react-query";
import { fetchPersonStarships } from "../services/api";
import { getStarshipsResponse } from "@/types/types";
import { useHeroContext } from "../contexts";

export const usePersonStarships = () => {
  const { selectedHero } = useHeroContext();

  const starshipIds = selectedHero?.starships;

  return useQuery<getStarshipsResponse, Error>({
    queryKey: ["personStarships", starshipIds],
    queryFn: () => fetchPersonStarships(starshipIds!),
    enabled: starshipIds && starshipIds.length > 0, // Only fetch if starshipIds are provided
  });
};
