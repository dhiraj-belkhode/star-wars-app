import queryClient from "../../shared/queryClient";
import { Character } from "../../types/Character.type";
import { useUpdateCharacter } from "./useUpdateCharacter";
import { renderHook, act } from "@testing-library/react";

describe("useUpdateCharacter Hook", () => {
  const sampleUrl = "https://swapi.dev/api/people/1";
  const existingCharacter: Character = {
    name: "Luke Skywalker",
    height: "172",
    hair_color: "blond",
    eye_color: "blue",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    url: sampleUrl,
  };

  const newRecord = {
    height: "175",
    hair_color: "brown",
  };

  beforeEach(() => {
    // Clear the cache before each test case
    queryClient.clear();
    // Set sample data in cache
    queryClient.setQueryData(
      ["characterDetails", sampleUrl],
      existingCharacter
    );
  });

  it("updates character data correctly in the cache", () => {
    const { result } = renderHook(() => useUpdateCharacter());

    act(() => {
      result.current(sampleUrl, newRecord);
    });

    const updatedCharacter = queryClient.getQueryData<Character>([
      "characterDetails",
      sampleUrl,
    ]);

    expect(updatedCharacter).toEqual({
      ...existingCharacter,
      ...newRecord,
    });
  });

  it("does nothing if there is no existing data in the cache", () => {
    const { result } = renderHook(() => useUpdateCharacter());
    const invalidUrl = "https://invalid-url.com/";

    act(() => {
      result.current(invalidUrl, newRecord);
    });

    const cachedData = queryClient.getQueryData<Character>([
      "characterDetails",
      invalidUrl,
    ]);
    expect(cachedData).toBeUndefined();
  });

  it("handles empty newRecord gracefully", () => {
    const { result } = renderHook(() => useUpdateCharacter());
    const emptyRecord = {};

    act(() => {
      result.current(sampleUrl, emptyRecord);
    });

    const updatedCharacter = queryClient.getQueryData<Character>([
      "characterDetails",
      sampleUrl,
    ]);
    expect(updatedCharacter).toEqual(existingCharacter);
  });
});
