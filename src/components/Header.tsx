import { Box, Container, styled } from "@mui/material";

export const Header = () => {
  const Logo = styled(Box)(({ theme }) => ({
    backgroundClip: "text",
    backgroundImage: "linear-gradient(to right, #09f1b8, #00a2ff);",
    WebkitTextStrokeColor: "transparent",
    WebkitTextStrokeWidth: "4px",
    fontSize: "clamp(28px, 3vw, 46px)",
    textTransform: "uppercase",
    fontWeight: 900,
    color: "#000",
    letterSpacing: "3px",
    maxWidth: "max-content",
    margin: "auto",
  }));

  return (
    <Box sx={{ my: 2 }}>
      <Container maxWidth="xl">
        <Logo>Star Wars</Logo>
      </Container>
    </Box>
  );
};
