import {
  UseQueryOptions,
  UseQueryResult,
  useQueries,
} from "@tanstack/react-query";
import { Film } from "../../types/Film.type";
import { fetchFilm } from "../../services/apiUtils";

/**
 * Helper function to create UseQueryOptions for a film URL.
 *
 * @param filmUrl - The URL to fetch film data from.
 * @returns UseQueryOptions for the provided film URL.
 */
const groupOptions = (filmUrl: string): UseQueryOptions<Film, Error> => ({
  queryKey: ["characterFilm", filmUrl],
  queryFn: () => fetchFilm(filmUrl),
  enabled: !!filmUrl,
  throwOnError: true,
});

/**
 * Custom hook to fetch film data from multiple URLs.
 *
 * @param filmUrls - An array of film URLs to fetch data from.
 * @returns An array of UseQueryResult objects, each containing data, loading, error, and other properties for a specific film.
 */
export const useFilms = (filmUrls: string[]): UseQueryResult<Film, Error>[] => {
  // Use the useQueries hook from @tanstack/react-query to fetch film data for each URL
  return useQueries({
    queries: filmUrls.map((filmUrl) => groupOptions(filmUrl)),
  });
};
