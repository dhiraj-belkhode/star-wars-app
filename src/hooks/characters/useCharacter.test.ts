import { renderHook, waitFor } from "@testing-library/react";
import { useCharacter } from "./useCharacter";
import { createWrapper } from "../../shared/QueryTestWrapper";
import * as apiUtils from "../../services/apiUtils";

jest.mock("../../services/apiUtils", () => ({
  fetchCharacter: jest.fn(),
}));

describe("useCharacter Hook", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  test("returns loading state initially", () => {
    const { result } = renderHook(
      () => useCharacter("https://swapi.dev/api/people/1"),
      {
        wrapper: createWrapper(),
      }
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("returns character data on success", async () => {
    const characterData = {
      name: "Luke Skywalker",
      height: "172",
      hair_color: "blond",
      eye_color: "blue",
      gender: "male",
      homeworld: "Tatooine",
      films: ["https://swapi.dev/api/films/1/"],
      url: "https://swapi.dev/api/people/1",
    };

    jest.spyOn(apiUtils, "fetchCharacter").mockResolvedValue(characterData);

    const { result } = renderHook(
      () => useCharacter("https://swapi.dev/api/people/1"),
      {
        wrapper: createWrapper(),
      }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.characterDetails).toEqual(characterData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
