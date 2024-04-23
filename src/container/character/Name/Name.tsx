import { Typography, TypographyProps } from "@mui/material";
import React from "react";

interface CharacterNameProps extends TypographyProps {
  name: string;
}

const CharacterName: React.FC<CharacterNameProps> = ({ name, ...props }) => {
  return <Typography {...props}>{name}</Typography>;
};

export default CharacterName;
