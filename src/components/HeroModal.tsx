import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { Graph } from "./Graph";
import IconButton from "@mui/material/IconButton";

type HeroModalProps = {
  open: boolean;
  onClose: () => void;
};

export const HeroModal = ({ open, onClose }: HeroModalProps) => {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" fullWidth={true}>
      <DialogTitle sx={{ position: "relative", textAlign: "center" }}>
        Films and Starships
        <IconButton
          onClick={onClose}
          aria-label="close"
          sx={{ position: "absolute", top: "7px", right: 0 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Graph />
    </Dialog>
  );
};
