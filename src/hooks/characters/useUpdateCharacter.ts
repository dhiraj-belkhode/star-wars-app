import queryClient from "../../shared/queryClient";
import { Character } from "../../types/Character.type";

type NewRecord = Partial<Character>;

/**
 * hook to update character data in the cache.
 * It uses the provided URL to fetch the existing character data from the cache
 * and merges it with the new record to update the cache.
 *
 * @returns A function that takes a URL and a new record,
 *          and updates the character data in the cache.
 */
export const useUpdateCharacter = () => {
  /**
   * Function to update character data in the cache.
   *
   * @param id - The id of the character data to update.
   * @param newRecord - An object containing the new record to merge with existing data.
   */
  return (id: string, newRecord: NewRecord): void => {
    // Retrieve existing data for the given URL from the cache
    const existingData: Character | undefined = queryClient.getQueryData([
      "characterDetails",
      id,
    ]);

    if (existingData) {
      // Merge existing data with the new record to create an updated character object
      const updatedCharacter: Character = {
        ...existingData,
        ...newRecord,
      };

      // Set the updated character data in the cache for the given URL
      queryClient.setQueryData(["characterDetails", id], updatedCharacter);
    }
  };
};
