import { getPersonFilms } from "../services/api";
import { Film } from "@/types/types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

type HeroModalProps = {
  name: string;
  filmIds: number[];
  id: string;
  open: boolean;
  onClose: () => void;
};

export const HeroModal = ({
  name,
  filmIds,
  id,
  open,
  onClose,
}: HeroModalProps) => {
  const [error, setError] = useState(null);
  const [films, setFilms] = useState<Film[]>([]);

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    getPersonFilms(id)
      .then(({ results }) => setFilms(results))
      .catch((e) => setError(e.message));
  }, [filmIds]);

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{name}</DialogTitle>
      {films && (
        <DialogContent>
          {films.map((f) => (
            <p key={f.id}>{f.title}</p>
          ))}
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
