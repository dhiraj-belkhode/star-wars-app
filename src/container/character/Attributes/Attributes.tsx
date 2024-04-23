import React from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import Dropdown from "../../../components/Dropdown";
import { genderOptions } from "../../../shared/constants";
import {
  useUpdateCharacter,
  useUpdateCharacters,
} from "../../../hooks/characters";

interface AttributesProps {
  height: string;
  hair_color: string;
  eye_color: string;
  gender: string;
  id: string;
}

const Attributes: React.FC<AttributesProps> = ({
  height,
  hair_color,
  eye_color,
  gender,
  id,
}) => {
  /**
   * Hook to update a single character.
   */
  const updateCharacter = useUpdateCharacter();

  /**
   * Hook to update multiple characters in the list.
   */
  const updateCharacters = useUpdateCharacters();

  /**
   * Handles changes in the gender dropdown.
   * Updates the character data using the provided URL and the selected gender value.
   *
   * @param event - The change event from the dropdown component.
   * @param id - The character's API id for updating data.
   */
  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) => {
    const value = event.target.value;
    const record = {
      gender: value,
    };
    updateCharacter(id, record);
    updateCharacters(id, record);
  };

  return (
    <List dense disablePadding>
      <ListItem disablePadding>
        <ListItemText primary={`Height: ${height}`} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText primary={`Hair color: ${hair_color}`} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText primary={`Eye color: ${eye_color}`} />
      </ListItem>
      <ListItem disablePadding>
        <ListItemText
          primary={
            <>
              Gender:
              {gender !== "n/a" ? (
                <Dropdown
                  onChange={(event) => handleChange(event, id)}
                  options={genderOptions}
                  value={gender}
                />
              ) : (
                ` ${gender}`
              )}
            </>
          }
        />
      </ListItem>
    </List>
  );
};

export default Attributes;
