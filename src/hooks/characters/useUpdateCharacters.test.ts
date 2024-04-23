import { renderHook, act } from "@testing-library/react";
import queryClient from "../../shared/queryClient";
import { useUpdateCharacters } from "./useUpdateCharacters";
import { Character } from "../../types/Character.type";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

const sampleUrl = "https://swapi.dev/api/people/1";
const existingCharacters: Character[] = [
  {
    name: "Luke Skywalker",
    height: "172",
    hair_color: "blond",
    eye_color: "blue",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    url: sampleUrl,
  },
  {
    name: "Leia Organa",
    height: "150",
    hair_color: "brown",
    eye_color: "brown",
    gender: "female",
    homeworld: "https://swapi.dev/api/planets/2/",
    films: ["https://swapi.dev/api/films/2/"],
    url: "https://swapi.dev/api/people/2",
  },
];

const newRecord = {
  height: "175",
  hair_color: "brown",
};

describe("useUpdateCharacters Hook", () => {
  // Clear the cache before each test and set initial data
  beforeEach(() => {
    queryClient.clear();
    queryClient.setQueryData(["characters"], existingCharacters);
  });

  it("updates character data correctly in the cache", () => {
    const { result } = renderHook(() => useUpdateCharacters());

    // Act: Call the function to update character data in the cache
    act(() => {
      result.current(getIdFromUrl(sampleUrl), newRecord);
    });

    // Retrieve the updated data from the cache
    const updatedCharacters = queryClient.getQueryData<Character[]>([
      "characters",
    ]);

    const expectedCharacters: Character[] = existingCharacters.map(
      (character) =>
        getIdFromUrl(character.url) === getIdFromUrl(sampleUrl)
          ? { ...character, ...newRecord }
          : character
    );
    expect(updatedCharacters).toEqual(expectedCharacters);
  });

  it("does nothing if there is no existing data in the cache", () => {
    queryClient.clear();

    const { result } = renderHook(() => useUpdateCharacters());

    act(() => {
      result.current(getIdFromUrl(sampleUrl), newRecord);
    });

    const cachedData = queryClient.getQueryData<Character[]>(["characters"]);

    expect(cachedData).toBeUndefined();
  });
});
