export type getPeopleResponse = {
  count: number;
  next: string | null;
  previous: string | null;
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
