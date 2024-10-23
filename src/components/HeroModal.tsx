import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect } from "react";
import { ReactFlow } from "@xyflow/react";
import { useReactFlow } from "../hooks";
import "@xyflow/react/dist/style.css";
import { Box } from "@mui/material";
import { usePersonFilms, usePersonStarships } from "../hooks/index";
import { Node } from "./Node";

type HeroModalProps = {
  name: string;
  id: string;
  starships: number[];
  open: boolean;
  onClose: () => void;
};

export const HeroModal = ({
  name,
  id,
  starships: starshipIds,
  open,
  onClose,
}: HeroModalProps) => {
  const {
    data: { results: films } = {},
    error: filmsError,
    isLoading: isLoadingFilms,
  } = usePersonFilms(id);
  const {
    data: { results: starships } = {},
    error: starshipsError,
    isLoading: isLoadingStarships,
  } = usePersonStarships(starshipIds);
  const { nodes, edges, addNode, addNewEdge } = useReactFlow({
    initialNodes: [
      {
        id: "0",
        position: { x: 0, y: 0 },
        data: { label: <Node label={name} iconType="person" /> },
      },
    ],
  });

  // useEffect(() => {
  //   setNodes(initialNodes);
  //   setEdges(initialEdges);
  // }, [id]);

  useEffect(() => {
    if (films && starships) {
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
          .filter((starship) => filmStarships.includes(starship.id))
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
  }, [addNewEdge, addNode, films, starships]);

  if (filmsError || starshipsError) return <div>Error loading data</div>;

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" fullWidth={true}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Films and Starships
      </DialogTitle>
      {isLoadingFilms || isLoadingStarships ? (
        <p>Loading...</p>
      ) : (
        <>
          <Box sx={{ color: "#000" }}>
            {nodes.length > 0 && (
              <div style={{ width: "1200px", height: "70vh" }}>
                <ReactFlow nodes={nodes} edges={edges} />
              </div>
            )}
          </Box>
          {films && (
            <DialogContent>
              {films.map((f) => (
                <div key={f.id}>
                  <h3>{f.title}</h3>
                  {starships
                    ?.filter((starship) => f.starships.includes(starship.id))
                    .map((starship) => (
                      <li key={starship.id}>{starship.name}</li>
                    ))}
                </div>
              ))}
            </DialogContent>
          )}
        </>
      )}
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
