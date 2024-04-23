import React from "react";
import { Link } from "react-router-dom";
import { useCharacters } from "../../hooks/characters";
import { useHomeWorlds } from "../../hooks/homeWorld";
import { Character, CharaterWithHomeWorld } from "../../types/Character.type"; // Assuming these types exist
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import Loader from "../../components/Loader";
import { CharacterName } from "../../container/character";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

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

  /**
   * Extracts homeworld URLs from the characters data.
   * Creates an array of URLs for fetching homeworld information.
   */
  const homeWorldUrls = characters?.map(
    (character: Character) => character.homeworld
  );

  /**
   * Fetches homeworld data using an array of homeworld URLs.
   * Returns an array of query results.
   */
  const homeworldQueries = useHomeWorlds(homeWorldUrls!);

  /**
   * Combines character data with fetched homeworld information.
   */
  const charactersWithHomeworld = characters?.map(
    (character: Character, index: number) => {
      const { data } = homeworldQueries[index];

      return {
        ...character,
        homeworldData: {
          name: data?.name || "N/A",
        },
      };
    }
  );

  return (
    <Box display="flex" justifyContent="center" mt={1}>
      {isLoading && <Loader size={30} />}
      {!isLoading && (
        <List dense sx={{ width: "100%", maxWidth: 360 }}>
          {charactersWithHomeworld?.map((character: CharaterWithHomeWorld) => (
            <React.Fragment key={character.url}>
              <ListItem sx={{ background: "antiquewhite" }}>
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
              <ListItem sx={{ pt: 0, pb: 0, background: "antiquewhite" }}>
                <ListItemText secondary={`Gender: ${character.gender}`} />
                <ListItemText
                  secondary={`Home planet: ${character.homeworldData.name}`}
                />
              </ListItem>
              <Divider component="li" sx={{ mb: 1 }} />
            </React.Fragment>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CharacterList;
