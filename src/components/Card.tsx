import { useModal } from "../hooks/index";
import { Box, Paper, Typography } from "@mui/material";
import { HeroModal } from "./HeroModal";
import { Image } from "./Image";
import { styled } from "@mui/material/styles";
import { useHeroContext } from "../contexts/index";

type CardProps = {
  id: string;
  name: string;
  starships: number[];
};

export const Card = ({ id, name, starships }: CardProps) => {
  const { isOpened, handleClose } = useModal();
  const { selectHero, selectedHero } = useHeroContext();

  const handleHeroClick = (id: string, name: string, starships: number[]) => {
    selectHero({ id, name, starships });
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
        <Image width={235} height={320} id={id} alt={name} />
        <Title>{name}</Title>
        {selectedHero && <HeroModal open={isOpened} onClose={handleClose} />}
      </Item>
    </Wrapper>
  );
};
