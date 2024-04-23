import { useQuery } from "@tanstack/react-query";
import { Character } from "../../types/Character.type";
import { fetchCharacter } from "../../services/apiUtils";

interface UseCharacterReturnType {
  characterDetails: Character | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 *  Hook to fetch character details from a given URL.
 *
 * @param id - The id to fetch the character data from. If undefined, the query will be disabled.
 * @returns An object containing the character details, loading state, error state, and error object (if any).
 */
export const useCharacter = (
  id: string | undefined
): UseCharacterReturnType => {
  const {
    data: characterDetails,
    isLoading,
    isError,
    error,
  } = useQuery<Character, Error>({
    queryKey: ["characterDetails", id], // Unique key for the query
    queryFn: () => fetchCharacter(id!), // Function to fetch character data from the API
    enabled: !!id, // Enable the query if a URL is provided
    throwOnError: true, // Throw an error if the query encounters an error
  });

  return {
    characterDetails,
    isLoading,
    isError,
    error,
  };
};
