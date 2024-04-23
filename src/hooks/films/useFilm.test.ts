import { renderHook, waitFor } from "@testing-library/react";
import { createWrapper } from "../../shared/QueryTestWrapper";
import { useFilms } from "./useFilm";
import * as apiUtils from "../../services/apiUtils";

jest.mock("../../services/apiUtils", () => ({
  fetchFilm: jest.fn(),
}));

describe("useFilms Hook", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("returns loading state initially", () => {
    const { result } = renderHook(() => useFilms(["url1", "url2"]), {
      wrapper: createWrapper(),
    });

    result.current.forEach((query) => {
      expect(query.isLoading).toBe(true);
      expect(query.isError).toBe(false);
      expect(query.data).toBeUndefined();
      expect(query.error).toBeNull();
    });
  });

  test("returns film data on success", async () => {
    const filmsData = [
      { title: "Film 1", director: "Director 1", producer: "Producer 1" },
      { title: "Film 2", director: "Director 2", producer: "Producer 2" },
    ];
    jest.spyOn(apiUtils, "fetchFilm").mockResolvedValueOnce(filmsData[0]);
    jest.spyOn(apiUtils, "fetchFilm").mockResolvedValueOnce(filmsData[1]);

    const { result } = renderHook(() => useFilms(["url1", "url2"]), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(!result.current[0].isLoading && !result.current[1].isLoading).toBe(
        false
      )
    );

    expect(result.current[0].data).toEqual(filmsData[0]);
    expect(result.current[1].data).toEqual(filmsData[1]);
    expect(result.current[0].isLoading).toBe(false);
    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[0].isError).toBe(false);
    expect(result.current[1].isError).toBe(false);
    expect(result.current[0].error).toBeNull();
    expect(result.current[1].error).toBeNull();
  });
});
