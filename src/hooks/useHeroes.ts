import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../services/api";
import { APIResponse, Hero } from "@/types/types";

export const useHeroes = (page: number) => {
  return useQuery<APIResponse<Hero>, Error>({
    queryKey: ["heroes", page],
    queryFn: () => fetchPeople(page),
    enabled: !!page, // Only fetch if page is available
  });
};
