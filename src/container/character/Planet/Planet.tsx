import { ListItemText } from "@mui/material";
import { useHomeWorld } from "../../../hooks/homeWorld";

interface PlanetProps {
  url: string;
}

const Planet: React.FC<PlanetProps> = ({ url }) => {
  const { data: characterHomeWorld } = useHomeWorld(url);
  return (
    <ListItemText secondary={`Home planet: ${characterHomeWorld?.name}`} />
  );
};

export default Planet;
