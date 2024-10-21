import { API } from "../constants/constants";
import { getPeopleResponse } from "../types/types";

export const getPeople = async (page: number): Promise<getPeopleResponse> => {
  return fetch(`${API}/people/?page=${page}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};
