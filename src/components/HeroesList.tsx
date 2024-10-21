import React, { useEffect, useState } from "react";
import { getPeople } from "../services/api";
import { Hero } from "../types/types";
import { Pagination } from "./Pagination";
import { transformPaginationCount } from "../utils/utils";
import Grid from "@mui/material/Grid2";

export const HeroesList = () => {
  const [error, setError] = useState(null);
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [pageCount, setPageCount] = React.useState(1);
  const [page, setPage] = React.useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    getPeople(page)
      .then(({ results, count }) => {
        setHeroes(results);
        setPageCount(transformPaginationCount(count, 10));
      })
      .catch((e) => setError(e));
  }, [page]);

  return (
    <div>
      {heroes && (
        <>
          {heroes.map((hero: Hero) => (
            <p key={hero.id}>{hero.name}</p>
          ))}
          <Grid display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              currentPage={page}
              handleChangePage={handleChangePage}
            />
          </Grid>
        </>
      )}
    </div>
  );
};
