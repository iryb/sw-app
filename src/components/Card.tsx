import { useModal } from "../hooks";
import { Box, Paper, Typography } from "@mui/material";
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

  const Wrapper = styled(Box)(({ theme }) => ({
    backgroundColor: "#17f8f8",
    padding: "3px",
    borderRadius: theme.shape.borderRadius * 1,
    "&:hover": {
      animationName: "hoverEffect",
      animationIterationCount: "infinite",
      animationDuration: "1s",
      animationDelay: "0ms",
    },
    "@keyframes hoverEffect": {
      "0%": {
        filter: "hue-rotate(0deg)",
      },
      "100%": {
        filter: "hue-rotate(360deg)",
      },
    },
  }));

  const Item = styled(Paper)(({ theme }) => ({
    maxWidth: "250px",
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    cursor: "pointer",
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));

  const Title = styled(Typography)(({ theme }) => ({
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "1px",
  }));

  return (
    <Wrapper>
      <Item elevation={12} onClick={() => handleHeroClick(id, name, starships)}>
        <Image id={id} alt={name} />
        <Title>{name}</Title>
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
    </Wrapper>
  );
};
