import React from "react";
import { Link } from "react-router-dom";
import { Toolbar, AppBar, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled Link component with documentation
/**
 * Styled component for Link elements used within the Header component.
 * Removes default text decoration and inherits color.
 */
const StyledLink = styled(Link)(() => ({
  textDecoration: "none",
  color: "inherit",
}));

const Header: React.FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: "center" }}>
        <StyledLink to="/">
          <Typography variant="h5" noWrap>
            Star Wars
          </Typography>
        </StyledLink>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
