import styled from "@emotion/styled";
import { ImageAPI } from "../constants/constants";

type ImageProps = {
  id: string;
  alt: string;
};

const ImageStyled = styled("img")(() => ({
  maxWidth: "100%",
  height: "auto",
}));

export const Image = ({ id, alt }: ImageProps) => {
  return <ImageStyled src={`${ImageAPI}/${id}.jpg`} alt={alt} />;
};
