import {
  CharacterAttributes,
  CharacterFilms,
  CharacterHomeworld,
  CharacterName,
} from "../../character";
import { Character } from "../../../types/Character.type";
import { useFilms } from "../../../hooks/films";
import { useHomeWorld } from "../../../hooks/homeWorld";
import AttributesCard from "../../../components/AttributesCard";
import { Card, CardContent, CardHeader, Divider, Grid } from "@mui/material";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";

interface DetailsProps {
  characterDetails: Character;
}

// Details component
const Details: React.FC<DetailsProps> = ({ characterDetails }) => {
  /**
   * Fetches film data using the character's film URLs.
   * Returns an array of film array of objects.
   */
  const characterFilmsQueries = useFilms(characterDetails.films!);

  /**
   * Fetches data for the character's homeworld using the provided URL.
   * Returns the homeworld data object.
   */
  const { data: characterHomeWorld } = useHomeWorld(characterDetails.homeworld);

  /**
   * Processes film data from the film queries.
   * Extracts the actual film data objects from the query results.
   *
   * @returns An array of film data objects or undefined if there's an error.
   */
  const characterFilms = characterFilmsQueries.map((filmQuery) => {
    const { data: filmData } = filmQuery;
    return filmData;
  });

  return (
    <Card sx={{ width: 500, background: "aliceblue" }}>
      <CardHeader
        title={
          <CharacterName
            variant="h4"
            sx={{ textDecoration: "underline" }}
            name={characterDetails.name}
          />
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <CharacterAttributes
          height={characterDetails.height}
          hair_color={characterDetails.hair_color}
          eye_color={characterDetails.eye_color}
          gender={characterDetails.gender}
          id={getIdFromUrl(characterDetails.url)}
        />
        <Divider sx={{ mt: 1, mb: 1 }} />

        <Grid
          container
          direction="row-reverse"
          justifyContent="center"
          alignItems="flex-start"
          spacing={1}
        >
          <Grid item xs={12} md={6}>
            <AttributesCard>
              <CharacterHomeworld homeworld={characterHomeWorld?.name} />
            </AttributesCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <AttributesCard>
              <CharacterFilms films={characterFilms} />
            </AttributesCard>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Details;
