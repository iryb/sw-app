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
  name: string;
  starships: number[];
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
