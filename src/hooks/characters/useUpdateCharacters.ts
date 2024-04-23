import { Character } from "../../types/Character.type";
import queryClient from "../../shared/queryClient";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

type NewRecord = Partial<Character>;

/**
 * Hook to update a specific character in the list of characters in the cache.
 * It uses the provided URL to find the character in the existing data and merges it with the new record to update the cache.
 *
 * @returns A function that takes a URL and a new record,
 *          and updates the character data in the cache.
 */
export const useUpdateCharacters = () => {
  /**
   * Function to update a specific character in the list of characters in the cache.
   *
   * @param id - The id of the character data to update.
   * @param newRecord - An object containing the new record to merge with existing data.
   */
  return (id: string, newRecord: NewRecord): void => {
    // Retrieve existing data for the list of characters from the React Query cache
    const existingData: Character[] | undefined = queryClient.getQueryData([
      "characters",
    ]);

    // If existing data is found, update the character data and set the updated data in the cache
    if (existingData) {
      const updatedCharacters: Character[] = existingData.map((item) => {
        // Check if the item's URL matches the provided URL
        if (getIdFromUrl(item.url) === id) {
          // Merge the existing character data with the new record
          return {
            ...item,
            ...newRecord,
          };
        }
        return item;
      });

      // Set the updated character data in the cache for the "characters" key
      queryClient.setQueryData(["characters"], updatedCharacters);
    }
  };
};
