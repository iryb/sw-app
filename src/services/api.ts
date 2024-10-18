import { API } from "../constants/constants.ts";
import { Hero } from "../types/types";

export const getPeople = async (): Promise<Hero[]> => {
  return fetch(`${API}/people`)
    .then((res) => res.json())
    .then((data) => data.results)
    .catch((error) => {
      throw new Error(error);
    });
};
