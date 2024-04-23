import { Card, CardContent } from "@mui/material";

interface AttributesCardProps {
  children: React.ReactNode;
}

const AttributesCard: React.FC<AttributesCardProps> = ({ children }) => {
  /**
   * Renders an MUI Card component with a custom antique white background.
   * The provided children are displayed within the card's content area.
   *
   * @param props - The component props.
   * @returns - The rendered AttributesCard component.
   */
  return (
    <Card sx={{ background: "antiquewhite" }}>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AttributesCard;
