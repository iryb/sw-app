import { useQuery } from "@tanstack/react-query";
import { fetchPersonFilms } from "../services/api";
import { APIResponse, Film } from "@/types/types";
import { useHeroContext } from "../contexts";

export const usePersonFilms = () => {
  const { selectedHero } = useHeroContext();

  const personId = selectedHero?.id;

  return useQuery<APIResponse<Film>, Error>({
    queryKey: ["personFilms", personId],
    queryFn: () => fetchPersonFilms(personId!),
    enabled: !!personId, // Only fetch if personId is available
  });
};
