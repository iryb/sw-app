import { API } from "../constants/constants";
import {
  getFilmsResponse,
  getPeopleResponse,
  getStarshipsResponse,
} from "../types/types";

export const fetchPeople = async (page: number): Promise<getPeopleResponse> => {
  const res = await fetch(`${API}/people/?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
};

export const fetchPersonFilms = async (
  personId: string
): Promise<getFilmsResponse> => {
  const res = await fetch(`${API}/films/?characters__in=${personId}`);
  if (!res.ok) throw new Error("Failed to fetch films");
  return res.json();
};

export const fetchPersonStarships = async (
  heroStarshipsIds: number[]
): Promise<getStarshipsResponse> => {
  const res = await fetch(
    `${API}/starships/?id__in=${heroStarshipsIds.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch starships");
  return res.json();
};
