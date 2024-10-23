import { useState } from "react";
import { useHeroes } from "../hooks/index";
import { Hero } from "../types/types";
import { Pagination } from "./Pagination";
import { transformPaginationCount } from "../utils/utils";
import Grid from "@mui/material/Grid2";
import { Card } from "./Card";
import { Container } from "@mui/material";
import { Skeleton } from "@mui/material";

export const HeroesList = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useHeroes(page);
  const heroes = data?.results || [];
  const count = data?.count || 0;
  const pageCount = transformPaginationCount(count, 10);

  if (isError) return <p>Error: {error?.message}</p>;

  if (isLoading)
    return (
      <Container maxWidth="xl">
        <Grid container spacing={2} justifyContent={"center"} sx={{ my: 4 }}>
          {[...Array(10)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={250}
              height={400}
            />
          ))}
        </Grid>
        <Grid size={12} display="flex" justifyContent="center" sx={{ my: 4 }}>
          <Skeleton variant="rectangular" width={300} height={30} />
        </Grid>
      </Container>
    );

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
