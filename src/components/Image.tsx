import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { fetchImage } from "../services/api";
import { Skeleton } from "@mui/material";

type ImageProps = {
  id: string;
  alt: string;
  width: number;
  height: number;
};

const ImageStyled = styled("img")(() => ({
  maxWidth: "100%",
  height: "auto",
}));

export const Image = ({ id, alt, width, height }: ImageProps) => {
  const {
    data: src,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["image", id],
    queryFn: () => fetchImage(id),
    staleTime: 1000 * 60 * 5,
  });

  if (error) {
    return <div>Error loading image</div>;
  }

  if (isLoading) {
    return <Skeleton variant="rectangular" width={width} height={height} />;
  }

  return <ImageStyled width={width} height={height} src={src} alt={alt} />;
};
