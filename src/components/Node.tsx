import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StarBorderPurple500Icon from "@mui/icons-material/StarBorderPurple500";
import TheatersIcon from "@mui/icons-material/Theaters";

type NodeProps = {
  label: string;
  iconType: "person" | "film" | "starship";
};

export const Node = ({ label, iconType }: NodeProps) => {
  const renderIcon = () => {
    switch (iconType) {
      case "person":
        return <PersonOutlineIcon />;
      case "film":
        return <TheatersIcon />;
      case "starship":
        return <StarBorderPurple500Icon />;
      default:
        return null;
    }
  };

  return (
    <p>
      <span style={{ display: "inline-block", verticalAlign: "middle" }}>
        {renderIcon()}
      </span>
      <span>{label}</span>
    </p>
  );
};
