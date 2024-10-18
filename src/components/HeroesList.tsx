import React, { useEffect, useState } from "react";
import { getPeople } from "../services/api.ts";
import { Hero } from "../types/types";

export const HeroesList = () => {
  const [error, setError] = useState(null);
  const [heroes, setHeroes] = useState<Hero[] | null>(null);

  useEffect(() => {
    getPeople()
      .then((data) => setHeroes(data))
      .catch((e) => setError(e));
  }, []);

  return (
    <div>
      {heroes && (
        <>
          {heroes.map((hero: Hero) => (
            <p>{hero.name}</p>
          ))}
        </>
      )}
    </div>
  );
};
