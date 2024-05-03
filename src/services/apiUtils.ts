import { api } from "./api";
import { DataResponse } from "../types/Response.type";
import { Character } from "../types/Character.type";
import { HomeWorld } from "../types/HomeWorld.type";
import { Film } from "../types/Film.type";

/**
 * Generic function to fetch data from a given URL.
 * The function uses a generic type `T` to specify the expected data type.
 * The function returns a Promise that resolves to a `DataResponse<T>`.
 *
 * @param url - The URL to fetch data from.
 * @returns A Promise that resolves to the data fetched from the URL.
 */
export const fetchData = async <T>(url: string): Promise<DataResponse<T>> => {
  const response = await api.get(url);
  return response.data;
};

/**
 * Fetches character data from the API.
 * Returns a Promise that resolves to an array of Character objects.
 *
 * @returns A Promise that resolves to an array of Character objects.
 */
export const fetchCharacters = async (): Promise<Character[]> => {
  const response = await fetchData<Character[]>("people/all.json?page=1");
  return response || [];
};

/**
 * Fetches data for a specific character from the API.
 * The function takes a character URL as a parameter.
 * Returns a Promise that resolves to a Character object.
 *
 * @param id - The id for the specific character.
 * @returns A Promise that resolves to the Character object.
 */
export const fetchCharacter = async (id: string): Promise<Character> => {
  return await fetchData<Character>(`/people/${id}`);
};

/**
 * Fetches data for a specific homeworld from the API.
 * The function takes a homeworld URL as a parameter.
 * Returns a Promise that resolves to a HomeWorld object.
 *
 * @param homeworldUrl - The URL for the specific homeworld.
 * @returns A Promise that resolves to the HomeWorld object.
 */
export const fetchHomeworld = async (
  homeworldUrl: string
): Promise<HomeWorld> => {
  return await fetchData<HomeWorld>(homeworldUrl);
};

/**
 * Fetches data for a specific film from the API.
 * The function takes a film URL as a parameter.
 * Returns a Promise that resolves to a Film object.
 *
 * @param filmUrl - The URL for the specific film.
 * @returns A Promise that resolves to the Film object.
 */
export const fetchFilm = async (filmUrl: string): Promise<Film> => {
  return await fetchData<Film>(filmUrl);
};
