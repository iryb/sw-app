export type APIResponse<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
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

export type Starship = {
  id: number;
  name: string;
};
