import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
  useQueries,
} from "@tanstack/react-query";
import { HomeWorld } from "../../types/HomeWorld.type";
import { fetchHomeworld } from "../../services/apiUtils";

/**
 * Helper function to create UseQueryOptions for a given homeworld URL.
 *
 * @param homeWorldUrl - The URL to fetch homeworld data from.
 * @returns UseQueryOptions for the provided homeworld URL.
 */
const groupOptions = (
  homeWorldUrl: string
): UseQueryOptions<HomeWorld, Error> => ({
  queryKey: ["characterHomeWorld", homeWorldUrl],
  queryFn: () => fetchHomeworld(homeWorldUrl),
  enabled: !!homeWorldUrl,
  throwOnError: true,
});

/**
 * Custom hook to fetch homeworld data for a single homeworld URL.
 *
 * @param homeWorldUrl - The URL of the homeworld to fetch data from.
 * @returns A UseQueryResult object containing data, loading, error, and other properties for the homeworld.
 */
export const useHomeWorld = (
  homeWorldUrl: string
): UseQueryResult<HomeWorld, Error> => {
  return useQuery(groupOptions(homeWorldUrl));
};

/**
 * Custom hook to fetch homeworld data from multiple URLs using.
 *
 * @param homeWorldUrls - An array of homeworld URLs to fetch data from.
 * @returns An array of UseQueryResult objects, each containing data, loading, error, and other properties for a specific homeworld.
 */
export const useHomeWorlds = (
  homeWorldUrls: string[]
): UseQueryResult<HomeWorld, Error>[] => {
  return useQueries({
    queries:
      homeWorldUrls?.map((homeWorldUrl) => {
        return groupOptions(homeWorldUrl);
      }) || [],
  });
};
