import { API } from "../constants/constants";
import { getFilmsResponse, getPeopleResponse } from "../types/types";

export const getPeople = async (page: number): Promise<getPeopleResponse> => {
  return fetch(`${API}/people/?page=${page}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};

export const getPersonFilms = async (
  personId: string
): Promise<getFilmsResponse> => {
  return await fetch(`${API}/films/?characters__in=${personId}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};
