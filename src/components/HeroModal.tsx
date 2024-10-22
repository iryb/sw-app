import { getPersonFilms, getPersonStarships } from "../services/api";
import { Film, Starship } from "@/types/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

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
        .then(({ results }) => setStarships(results))
        .catch((e) => setError(e.message));
    }
  }, [starshipsIds]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
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
