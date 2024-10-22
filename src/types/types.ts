type APIResponse = {
  count: number;
  next: string | null;
  previous: string | null;
};

export type getPeopleResponse = APIResponse & {
  results: Hero[];
};

export type Hero = {
  id: string;
  birthYear: string;
  eyeColor: string;
  films: number[];
  gender: string;
  hairColor: string;
  height: number;
  homeworld: number;
  mass: number;
  name: string;
  skinColor: string;
  created: Date;
  edited: Date;
  species: number[];
  starships: number[];
  url: string;
  vehicles: number[];
};

export type Film = {
  id: number;
  title: string;
  starships: number[];
};

export type getFilmsResponse = APIResponse & {
  results: Film[];
};

export type Starship = {
  id: number;
  name: string;
};

export type getStarshipsResponse = APIResponse & {
  results: Starship[];
};
