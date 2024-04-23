import { useParams } from "react-router-dom";
import { Details } from "../../container/character";
import { Character } from "../../types/Character.type";
import { useCharacter } from "../../hooks/characters";
import { Box } from "@mui/material";
import Loader from "../../components/Loader";

interface Params {
  characterUrl: string;
  [key: string]: string | undefined;
}

interface CharacterDetailsProps {
  character?: Character;
}

// CharacterDetails component
const CharacterDetails: React.FC<CharacterDetailsProps> = () => {
  const { id } = useParams<Params>();

  /**
   * Fetches character data using the character URL.
   * Returns an object containing the character details and a loading state.
   */
  const { characterDetails, isLoading } = useCharacter(id);

  return (
    <Box display="flex" justifyContent="center" mt={1}>
      {isLoading && <Loader size={30} />}
      {!isLoading && characterDetails && (
        <Details characterDetails={characterDetails} />
      )}
    </Box>
  );
};

export default CharacterDetails;
