import { renderHook, waitFor } from "@testing-library/react";
import { useCharacters } from "./useCharacters";
import { createWrapper } from "../../shared/QueryTestWrapper";
import * as apiUtils from "../../services/apiUtils";

describe("useCharacters Hook", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  test("returns loading state initially", () => {
    jest
      .spyOn(apiUtils, "fetchCharacters")
      .mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useCharacters(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  test("returns character data on success", async () => {
    const charactersData = [
      {
        name: "Luke Skywalker",
        height: "172",
        hair_color: "blond",
        eye_color: "blue",
        gender: "male",
        homeworld: "Tatooine",
        films: ["https://swapi.dev/api/films/1/"],
        url: "https://swapi.dev/api/people/1",
      },
    ];

    jest.spyOn(apiUtils, "fetchCharacters").mockResolvedValue(charactersData);

    const { result } = renderHook(() => useCharacters(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.characters).toEqual(charactersData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
