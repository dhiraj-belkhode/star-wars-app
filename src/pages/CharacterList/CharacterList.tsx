import React from "react";
import { Link } from "react-router-dom";
import { useCharacters } from "../../hooks/characters";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import Loader from "../../components/Loader";
import { CharacterName } from "../../container/character";
import { getIdFromUrl } from "../../utils/getIdFromUrl";
import Planet from "../../container/character/Planet/Planet";
import AttributesCard from "../../components/AttributesCard";

/**
 * CharacterList component displaying a list of characters with their homeworld and gender information.
 * Fetches characters and their homeworld data using hooks.
 */
const CharacterList: React.FC = () => {
  /**
   * Fetches character data from the API.
   * Returns an object containing an array of characters and a loading state.
   */
  const { characters, isLoading } = useCharacters();

  return (
    <Box display="flex" justifyContent="center" mt={1}>
      {isLoading && <Loader size={30} />}
      {!isLoading && (
        <List dense sx={{ width: "100%", maxWidth: 360 }}>
          {characters?.map((character) => (
            <React.Fragment key={character.url}>
              <AttributesCard>
                <ListItem disableGutters disablePadding>
                  <Link
                    to={`/character/${getIdFromUrl(character.url)}`}
                    key={character.url}
                  >
                    <ListItemText
                      primary={
                        <CharacterName
                          variant="h6"
                          sx={{ textDecoration: "underline" }}
                          name={character.name}
                        />
                      }
                    />
                  </Link>
                </ListItem>
                <ListItem disableGutters disablePadding>
                  <ListItemText secondary={`Gender: ${character.gender}`} />
                  <Planet url={character.homeworld} />
                </ListItem>
              </AttributesCard>
              <Divider component="li" sx={{ mb: 1 }} />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CharacterList;
