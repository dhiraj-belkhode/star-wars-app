import { useQuery } from "@tanstack/react-query";
import { Character } from "../../types/Character.type";
import { fetchCharacters } from "../../services/apiUtils";

interface UseCharactersReturnType {
  characters?: Character[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

/**
 * Custom hook to fetch a list of characters.
 *
 * @returns An object containing the list of characters, loading state, error state, and error object (if any).
 */
export const useCharacters = (): UseCharactersReturnType => {
  // Use the useQuery hook to fetch the list of characters
  const {
    data: characters,
    isLoading,
    isError,
    error,
  } = useQuery<Character[], Error>({
    queryKey: ["characters"], // Unique key for the query
    queryFn: fetchCharacters, // Function to fetch characters data from the API
    throwOnError: true, // Throw an error if the query encounters an error
  });

  return {
    characters,
    isLoading,
    isError,
    error,
  };
};
