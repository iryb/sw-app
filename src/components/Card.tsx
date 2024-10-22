import { useModal } from "../hooks";
import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { HeroModal } from "./HeroModal";
import { Image } from "./Image";
import { styled } from "@mui/material/styles";

type CardProps = {
  id: string;
  name: string;
  starships: number[];
};

export const Card = ({ id, name, starships }: CardProps) => {
  const { isOpened, handleClose } = useModal();
  const [selectedHero, setSelectedHero] = useState<string>();
  const [selectedHeroName, setSelectedHeroName] = useState<string>();
  const [selectedHeroStarships, setSelectedHeroStarships] =
    useState<number[]>();

  const handleHeroClick = (id: string, name: string, starships: number[]) => {
    setSelectedHero(id);
    setSelectedHeroName(name);
    setSelectedHeroStarships(starships);
    handleClose();
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  return (
    <Item elevation={12} onClick={() => handleHeroClick(id, name, starships)}>
      <Image id={id} alt={name} />
      <Typography>{name}</Typography>
      {selectedHero && selectedHeroName && selectedHeroStarships && (
        <HeroModal
          name={selectedHeroName}
          id={selectedHero}
          open={isOpened}
          onClose={handleClose}
          starships={selectedHeroStarships}
        />
      )}
    </Item>
  );
};
