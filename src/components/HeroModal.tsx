import { getPersonFilms, getPersonStarships } from "../services/api";
import { Film, Starship } from "@/types/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { ReactFlow } from "@xyflow/react";
import { useReactFlow } from "../hooks";
import "@xyflow/react/dist/style.css";
import { Box } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import TheatersIcon from "@mui/icons-material/Theaters";

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
  starships: starshipsIds,
  open,
  onClose,
}: HeroModalProps) => {
  const [error, setError] = useState(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  const initialNodes = [
    {
      id: "0",
      position: { x: 0, y: 0 },
      data: {
        label: (
          <p>
            <span style={{ display: "inline-block", verticalAlign: "middle" }}>
              <PersonOutlineIcon />
            </span>
            <span>{name}</span>
          </p>
        ),
      },
    },
  ];
  const { nodes, edges, addNode, addNewEdge } = useReactFlow({ initialNodes });

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getPersonFilms(id)
      .then(({ results }) => setFilms(results))
      .catch((e) => setError(e.message));
  }, [id]);

  useEffect(() => {
    if (starshipsIds.length > 0) {
      getPersonStarships(starshipsIds)
        .then(({ results }) => {
          setStarships(results);
        })
        .catch((e) => setError(e.message));
    }
  }, [starshipsIds]);

  // useEffect(() => {
  //   setNodes(initialNodes);
  //   setEdges(initialEdges);
  // }, [id]);

  useEffect(() => {
    const nodeWidth = 150;
    const horizontalSpacing = 50;

    films.forEach(({ id, title, starships: filmStarships }, index) => {
      const filmX = index * (nodeWidth + horizontalSpacing);

      addNode(
        `film-n-${id}`,
        { x: filmX, y: 200 },
        {
          label: (
            <p>
              <span
                style={{ display: "inline-block", verticalAlign: "middle" }}
              >
                <TheatersIcon />
              </span>
              <span>{title}</span>
            </p>
          ),
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
              label: (
                <p>
                  <span
                    style={{ display: "inline-block", verticalAlign: "middle" }}
                  >
                    <StarBorderPurple500Icon />
                  </span>
                  <span>{starship.name}</span>
                </p>
              ),
            }
          );
          addNewEdge(
            `starship-e-${id}-${starship.id}`,
            `film-n-${id}`,
            `starship-n-${starship.id}`
          );
        });
    });
  }, [addNewEdge, addNode, films, starships]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" fullWidth={true}>
      <DialogTitle sx={{ textAlign: "center" }}>
        Films and Starships
      </DialogTitle>
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
                .filter((starship) => f.starships.includes(starship.id))
                .map((starship) => (
                  <li key={starship.id}>{starship.name}</li>
                ))}
            </div>
          ))}
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
