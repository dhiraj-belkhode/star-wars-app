import React from "react";
import { DropdownProps } from "../../types/Dropdown.type";
import { styled } from "@mui/material/styles";

// Styled select element using MUI's styled function
const StyledSelect = styled("select")(({ theme }) => ({
  border: "none",
  background: theme.palette.background.paper,
  color: theme.palette.text.primary,
  padding: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  "&:focus": {
    outline: "none",
    backgroundColor: theme.palette.action.hover,
  },
}));

/**
 * Dropdown component to render a styled select element with provided options.
 *
 * @param options - An array of options for the dropdown, each containing a value and label.
 * @param onChange - The function to call when the selected value changes.
 * @param value - The currently selected value.
 * @returns The styled select element with options.
 */
const Dropdown: React.FC<DropdownProps> = ({ options, onChange, value }) => {
  return (
    <StyledSelect value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Dropdown;
