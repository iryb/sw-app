import { API, ImageAPI } from "../constants/constants";
import { APIResponse, Film, Hero, Starship } from "../types/types";

export const fetchPeople = async (page: number): Promise<APIResponse<Hero>> => {
  const res = await fetch(`${API}/people/?page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
};

export const fetchPersonFilms = async (
  personId: string
): Promise<APIResponse<Film>> => {
  const res = await fetch(`${API}/films/?characters__in=${personId}`);
  if (!res.ok) throw new Error("Failed to fetch films");
  return res.json();
};

export const fetchPersonStarships = async (
  heroStarshipsIds: number[]
): Promise<APIResponse<Starship>> => {
  const res = await fetch(
    `${API}/starships/?id__in=${heroStarshipsIds.toString()}`
  );
  if (!res.ok) throw new Error("Failed to fetch starships");
  return res.json();
};

export const fetchImage = async (id: string): Promise<string> => {
  const res = await fetch(`${ImageAPI}/${id}.jpg`);
  if (!res.ok) throw new Error("Failed to fetch image");
  return res.url;
};
