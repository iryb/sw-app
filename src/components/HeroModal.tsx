import { getPersonFilms, getPersonStarships } from "../services/api";
import { Film, Starship } from "@/types/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCallback, useEffect, useState } from "react";
import {
  addEdge,
  applyNodeChanges,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type HeroModalProps = {
  name: string;
  id: string;
  starships: number[];
  open: boolean;
  onClose: () => void;
};

const initialEdges = [{ id: "e1-1", source: "0", target: "0" }];

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
    { id: "0", position: { x: 0, y: 0 }, data: { label: <p>{name}</p> } },
  ];

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const handleClose = () => {
    onClose();
  };

  const addNode = useCallback((id: string, position: any, data: any) => {
    setNodes((nds) => [
      ...nds,
      {
        id,
        position,
        data,
      },
    ]);
  }, []);

  const addNewEdge = useCallback(
    (id: string, source: string, target: string) => {
      setEdges((eds) => addEdge({ id, source, target }, eds));
    },
    []
  );

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

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [id]);

  useEffect(() => {
    films.forEach(({ id, title, starships: filmStarships }) => {
      addNode(
        `film-n-${id}`,
        { x: Math.random() * 500, y: 100 },
        { label: <p>{title}</p> }
      );
      addNewEdge(`film-e-${id}`, "0", `film-n-${id}`);

      starships
        .filter((starship) => filmStarships.includes(starship.id))
        .forEach((starship) => {
          addNode(
            `starship-n-${starship.id}`,
            { x: Math.random() * 500, y: 200 },
            { label: <p>{starship.name}</p> }
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
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
      {nodes.length > 0 && (
        <div style={{ width: "500px", height: "500px" }}>
          <ReactFlow nodes={nodes} edges={edges} fitView />
        </div>
      )}
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
