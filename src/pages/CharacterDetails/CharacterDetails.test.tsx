import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CharacterDetails from "./CharacterDetails";
import Details from "../../container/character/Details";

import * as characterHooks from "../../hooks/characters";
import { Character } from "../../types/Character.type";

jest.mock("../../hooks/characters", () => ({
  useCharacter: jest.fn(),
}));

jest.mock("../../container/character/Details", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Details Component</div>),
}));

describe("CharacterDetails Component", () => {
  const queryClient = new QueryClient();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays Loader when data is loading", () => {
    jest.spyOn(characterHooks, "useCharacter").mockReturnValue({
      characterDetails: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            "/details?characterUrl=https://swapi.dev/api/people/1",
          ]}
        >
          <Routes>
            <Route path="/details" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const progressIndicator = getByRole("progressbar");
    expect(progressIndicator).toHaveClass("MuiCircularProgress-indeterminate");
  });

  test("displays Details component when data is loaded", async () => {
    const characterData: Character = {
      name: "Luke Skywalker",
      height: "172",
      hair_color: "blond",
      eye_color: "blue",
      gender: "male",
      homeworld: "Tatooine",
      films: ["https://swapi.dev/api/films/1/"],
      url: "https://swapi.dev/api/people/1",
    };

    jest.spyOn(characterHooks, "useCharacter").mockReturnValue({
      characterDetails: characterData,
      isLoading: false,
      error: null,
      isError: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter
          initialEntries={[
            "/details?characterUrl=https://swapi.dev/api/people/1",
          ]}
        >
          <Routes>
            <Route path="/details" element={<CharacterDetails />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Details Component")).toBeInTheDocument();
    });

    expect(Details).toHaveBeenCalledWith(
      { characterDetails: characterData },
      expect.anything()
    );
  });
});
