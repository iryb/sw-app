import { API } from "../constants/constants";
import {
  getFilmsResponse,
  getPeopleResponse,
  getStarshipsResponse,
} from "../types/types";

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

export const getPersonStarships = async (
  heroStarshipsIds: number[]
): Promise<getStarshipsResponse> => {
  return await fetch(`${API}/starships/?id__in=${heroStarshipsIds.toString()}`)
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(error);
    });
};
