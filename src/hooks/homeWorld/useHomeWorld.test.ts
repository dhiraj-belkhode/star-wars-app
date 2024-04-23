import { renderHook, waitFor } from "@testing-library/react";
import { useHomeWorld, useHomeWorlds } from "./useHomeWorld";
import { createWrapper } from "../../shared/QueryTestWrapper";
import * as apiUtils from "../../services/apiUtils";

jest.mock("../../services/apiUtils", () => ({
  fetchHomeworld: jest.fn(),
}));

describe("useHomeWorld and useHomeWorlds Hooks", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  test("useHomeWorld returns loading state initially", () => {
    const { result } = renderHook(() => useHomeWorld("homeworld_url"), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();
  });

  test("useHomeWorld returns home world data on success", async () => {
    const homeWorldData = {
      name: "Tatooine",
      climate: "arid",
      terrain: "desert",
    };

    jest.spyOn(apiUtils, "fetchHomeworld").mockResolvedValueOnce(homeWorldData);

    const { result } = renderHook(() => useHomeWorld("homeworld_url"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => !result.current.isLoading);

    expect(result.current.data).toEqual(homeWorldData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("useHomeWorlds returns loading state initially", () => {
    const { result } = renderHook(() => useHomeWorlds(["url1", "url2"]), {
      wrapper: createWrapper(),
    });

    result.current.forEach((query) => {
      expect(query.isLoading).toBe(true);
      expect(query.isError).toBe(false);
      expect(query.data).toBeUndefined();
      expect(query.error).toBeNull();
    });
  });

  test("useHomeWorlds returns home world data on success", async () => {
    const homeWorldsData = [
      { name: "Tatooine", climate: "arid", terrain: "desert" },
      {
        name: "Alderaan",
        climate: "temperate",
        terrain: "grasslands, mountains",
      },
    ];

    jest
      .spyOn(apiUtils, "fetchHomeworld")
      .mockResolvedValueOnce(homeWorldsData[0]);
    jest
      .spyOn(apiUtils, "fetchHomeworld")
      .mockResolvedValueOnce(homeWorldsData[1]);
    const { result } = renderHook(() => useHomeWorlds(["url1", "url2"]), {
      wrapper: createWrapper(),
    });
    await waitFor(() =>
      expect(!result.current[0].isLoading && !result.current[1].isLoading).toBe(
        false
      )
    );
    expect(result.current[0].data).toEqual(homeWorldsData[0]);
    expect(result.current[1].data).toEqual(homeWorldsData[1]);
    expect(result.current[0].isLoading).toBe(false);
    expect(result.current[1].isLoading).toBe(false);
    expect(result.current[0].isError).toBe(false);
    expect(result.current[1].isError).toBe(false);
    expect(result.current[0].error).toBeNull();
    expect(result.current[1].error).toBeNull();
  });
});
