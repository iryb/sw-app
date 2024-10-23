import { useQuery } from "@tanstack/react-query";
import { fetchPeople } from "../services/api";
import { getPeopleResponse } from "@/types/types";

export const useHeroes = (page: number) => {
  return useQuery<getPeopleResponse, Error>({
    queryKey: ["heroes", page],
    queryFn: () => fetchPeople(page),
    enabled: !!page, // Only fetch if page is available
  });
};
