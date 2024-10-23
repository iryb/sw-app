import { useEffect, useState } from "react";
import { getPeople } from "../services/api";
import { Hero } from "../types/types";
import { Pagination } from "./Pagination";
import { transformPaginationCount } from "../utils/utils";
import Grid from "@mui/material/Grid2";
import { Card } from "./Card";
import { Box, Container, Stack } from "@mui/material";

export const HeroesList = () => {
  const [error, setError] = useState(null);
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPeople(page)
      .then(({ results, count }) => {
        setHeroes(results);
        setPageCount(transformPaginationCount(count, 10));
      })
      .catch((e) => setError(e));
  }, [page]);

  return (
    <>
      {heroes && (
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent={"center"} sx={{ my: 4 }}>
            {heroes.map(({ id, name, starships }: Hero) => (
              <Card key={id} id={id} name={name} starships={starships} />
            ))}
          </Grid>
          <Grid size={12} display="flex" justifyContent="center" sx={{ my: 4 }}>
            <Pagination
              count={pageCount}
              currentPage={page}
              handleChangePage={(_, value: number) => setPage(value)}
            />
          </Grid>
        </Container>
      )}
    </>
  );
};
