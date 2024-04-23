import React from "react";
import { Divider, Typography } from "@mui/material";
import { Film } from "../../../types/Film.type";

interface FilmsProps {
  films: (Film | undefined)[];
}

const Films: React.FC<FilmsProps> = ({ films }) => {
  return (
    <div>
      <Typography variant="body1">Films</Typography>
      <Divider sx={{ mb: 1 }} />
      {films?.length > 0 ? (
        films.map((film, index) => (
          <Typography key={index} variant="body2">
            {film?.title}
          </Typography>
        ))
      ) : (
        <Typography variant="body2">No films found.</Typography>
      )}
    </div>
  );
};

export default Films;
