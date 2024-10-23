import { useEffect } from "react";
import { ReactFlow } from "@xyflow/react";
import { useReactFlow } from "../hooks";
import "@xyflow/react/dist/style.css";
import { Box } from "@mui/material";
import { usePersonFilms, usePersonStarships } from "../hooks/index";
import { Node } from "./Node";
import { useHeroContext } from "../contexts/index";

export const Graph = () => {
  const { selectedHero } = useHeroContext();

  const {
    data: { results: films } = {},
    error: filmsError,
    isLoading: isLoadingFilms,
  } = usePersonFilms();
  const {
    data: { results: starships } = {},
    error: starshipsError,
    isLoading: isLoadingStarships,
  } = usePersonStarships();

  const { nodes, edges, addNode, addNewEdge } = useReactFlow({
    initialNodes: [
      {
        id: "0",
        position: { x: 0, y: 0 },
        data: { label: <Node label={selectedHero!.name} iconType="person" /> },
      },
    ],
  });

  useEffect(() => {
    if (films) {
      const nodeWidth = 150;
      const horizontalSpacing = 50;

      films.forEach(({ id, title, starships: filmStarships }, index) => {
        const filmX = index * (nodeWidth + horizontalSpacing);

        addNode(
          `film-n-${id}`,
          { x: filmX, y: 200 },
          {
            label: <Node label={title} iconType="film" />,
          }
        );
        addNewEdge(`film-e-${id}`, "0", `film-n-${id}`);

        starships
          ?.filter((starship) => filmStarships.includes(starship.id))
          .forEach((starship, starshipIndex) => {
            const starshipX = starshipIndex * (nodeWidth + horizontalSpacing);

            addNode(
              `starship-n-${starship.id}`,
              { x: starshipX, y: 400 },
              {
                label: <Node label={starship.name} iconType="starship" />,
              }
            );
            addNewEdge(
              `starship-e-${id}-${starship.id}`,
              `film-n-${id}`,
              `starship-n-${starship.id}`
            );
          });
      });
    }
  }, [addNewEdge, addNode, films, starships, selectedHero]);

  if (filmsError || starshipsError) return <div>Error loading data</div>;

  return (
    <>
      {isLoadingFilms || isLoadingStarships ? (
        <p>Loading...</p>
      ) : (
        <>
          <Box sx={{ color: "#000" }}>
            {nodes.length > 0 && (
              <Box sx={{ width: "1200px", height: "70vh", padding: 4 }}>
                <ReactFlow nodes={nodes} edges={edges} />
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
