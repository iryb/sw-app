import React, { useEffect, useState } from "react";
import { getPeople } from "../services/api";
import { Hero } from "../types/types";
import { Pagination } from "./Pagination";
import { transformPaginationCount } from "../utils/utils";
import Grid from "@mui/material/Grid2";
import { HeroModal } from "./HeroModal";

export const HeroesList = () => {
  const [error, setError] = useState(null);
  const [heroes, setHeroes] = useState<Hero[] | null>(null);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string>();
  const [selectedHeroName, setSelectedHeroName] = useState<string>();
  const [selectedHeroStarships, setSelectedHeroStarships] =
    useState<number[]>();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleModalClose = () => {
    setOpenModal(!openModal);
  };

  const handleHeroClick = (id: string, name: string, starships: number[]) => {
    setSelectedHero(id);
    setSelectedHeroName(name);
    setSelectedHeroStarships(starships);
    setOpenModal(true);
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
          {heroes.map(({ id, name, starships }: Hero) => (
            <p key={id} onClick={() => handleHeroClick(id, name, starships)}>
              {name}
            </p>
          ))}
          <Grid display="flex" justifyContent="center">
            <Pagination
              count={pageCount}
              currentPage={page}
              handleChangePage={handleChangePage}
            />
          </Grid>
          {selectedHero && selectedHeroName && selectedHeroStarships && (
            <HeroModal
              name={selectedHeroName}
              id={selectedHero}
              open={openModal}
              onClose={handleModalClose}
              starships={selectedHeroStarships}
            />
          )}
        </>
      )}
    </div>
  );
};
