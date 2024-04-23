import React from "react";
import { Divider, Typography } from "@mui/material";

interface HomeworldProps {
  homeworld: string | undefined;
}

const Homeworld: React.FC<HomeworldProps> = ({ homeworld }) => {
  return (
    <div>
      <Typography variant="body1">Home Planet</Typography>
      <Divider sx={{ mb: 1 }} />
      <Typography variant="body2">{homeworld}</Typography>
    </div>
  );
};

export default Homeworld;
