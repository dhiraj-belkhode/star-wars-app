import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import CharacterList from "./CharacterList";
import * as characterHooks from "../../hooks/characters";
import * as homeWorldHooks from "../../hooks/homeWorld";
import { Character } from "../../types/Character.type";
import { HomeWorld } from "../../types/HomeWorld.type";
import CharacterDetails from "../CharacterDetails";
import PageLayout from "../../components/PageLayout";
import { getIdFromUrl } from "../../utils/getIdFromUrl";

jest.mock("../../hooks/characters", () => ({
  useCharacters: jest.fn(),
  useCharacter: jest.fn(),
  useUpdateCharacter: jest.fn(),
  useUpdateCharacters: jest.fn(),
}));

jest.mock("../../hooks/homeWorld", () => ({
  useHomeWorlds: jest.fn(),
  useHomeWorld: jest.fn(),
}));

describe("CharacterList Component", () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test("displays Loader when data is loading", () => {
    jest.spyOn(characterHooks, "useCharacters").mockReturnValue({
      characters: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    const { getByRole } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<CharacterList />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const progressIndicator = getByRole("progressbar");
    expect(progressIndicator).toHaveClass("MuiCircularProgress-indeterminate");
  });

  test("displays characters list when data is loaded", async () => {
    const charactersData: Character[] = [
      {
        name: "Luke Skywalker",
        gender: "male",
        height: "172",
        hair_color: "blond",
        eye_color: "blue",
        homeworld: "https://swapi.dev/api/planets/1/",
        url: "https://swapi.dev/api/people/1",
        films: ["https://swapi.dev/api/films/1"],
      },
    ];

    const homeWorldsData = { name: "Tatooine" };

    jest.spyOn(characterHooks, "useCharacters").mockReturnValue({
      characters: charactersData,
      isLoading: false,
      isError: false,
      error: null,
    });

    jest.spyOn(homeWorldHooks, "useHomeWorld").mockReturnValue({
      data: homeWorldsData,
      isLoading: false,
      isError: false,
      error: null,
    } as UseQueryResult<HomeWorld, Error>);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<CharacterList />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => screen.getAllByRole("link").length > 0);

    charactersData.forEach((character) => {
      const characterLink = screen.getByText(character.name);
      expect(characterLink).toBeInTheDocument();
      expect(characterLink.closest("a")).toHaveAttribute(
        "href",
        `/character/${getIdFromUrl(character.url)}`
      );
    });

    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Home planet: Tatooine")).toBeInTheDocument();
  });

  test("navigates to character details when clicking a link", async () => {
    const mockCharacterDetails = {
      characterDetails: {
        name: "Luke Skywalker",
        height: "172",
        hair_color: "blond",
        eye_color: "blue",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1/",
        films: ["https://swapi.dev/api/films/1/"],
        url: "https://swapi.dev/api/people/1",
      },
      isLoading: false,
      isError: false,
      error: null,
    };
    const homeWorldData = {
      data: { name: "Tatooine" },
      isLoading: false,
      isError: false,
      error: null,
    } as UseQueryResult<HomeWorld, Error>;

    jest.spyOn(homeWorldHooks, "useHomeWorld").mockReturnValue(homeWorldData);

    jest
      .spyOn(characterHooks, "useCharacter")
      .mockReturnValue(mockCharacterDetails);

    const initialUrl = "/";

    const characters = [
      {
        url: "https://swapi.info/api/people/1",
        name: "Luke Skywalker",
        gender: "male",
        homeworld: "https://swapi.dev/api/planets/1",
        homeworldData: { name: "Tatooine" },
      },
    ];

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialUrl]}>
          <Routes>
            <Route path="/" element={<PageLayout />}>
              <Route index element={<CharacterList />} />
            </Route>
            <Route path="/character/:id" element={<PageLayout />}>
              <Route index element={<CharacterDetails />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const characterLink = getByText(characters[0].name);
    fireEvent.click(characterLink);

    await waitFor(() => {
      expect(screen.getByText(characters[0].name)).toBeInTheDocument();
    });
  });
});
