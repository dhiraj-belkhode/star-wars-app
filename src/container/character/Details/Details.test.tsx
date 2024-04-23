import { render, screen } from "@testing-library/react";
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from "@tanstack/react-query";
import Details from "./Details";
import * as filmHooks from "../../../hooks/films";
import * as homeWorldHooks from "../../../hooks/homeWorld";
import { HomeWorld } from "../../../types/HomeWorld.type";
import { Film } from "../../../types/Film.type";

jest.mock("../../../hooks/films", () => ({
  useFilms: jest.fn(),
}));
jest.mock("../../../hooks/homeWorld", () => ({
  useHomeWorld: jest.fn(),
}));

describe("Details Component", () => {
  const queryClient = new QueryClient();

  const characterDetails = {
    name: "Luke Skywalker",
    height: "172",
    hair_color: "blond",
    eye_color: "blue",
    gender: "male",
    homeworld: "https://swapi.dev/api/planets/1/",
    films: ["https://swapi.dev/api/films/1/"],
    url: "https://swapi.dev/api/people/1",
  };

  const mockFilmsData = [{ data: { title: "A New Hope" } }];
  const mockHomeWorldData = { data: { name: "Tatooine" } };

  beforeEach(() => {
    jest
      .spyOn(filmHooks, "useFilms")
      .mockReturnValue(mockFilmsData as UseQueryResult<Film, Error>[]);
    jest
      .spyOn(homeWorldHooks, "useHomeWorld")
      .mockReturnValue(mockHomeWorldData as UseQueryResult<HomeWorld, Error>);
  });

  test("renders without crashing", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Details characterDetails={characterDetails} />
      </QueryClientProvider>
    );
  });

  test("renders correct child components", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Details characterDetails={characterDetails} />
      </QueryClientProvider>
    );

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toHaveValue("male");
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Hair color: blond")).toBeInTheDocument();
    expect(screen.getByText("Eye color: blue")).toBeInTheDocument();
    expect(screen.getByText("Tatooine")).toBeInTheDocument();
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  test("checks if hooks are called with correct arguments", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Details characterDetails={characterDetails} />
      </QueryClientProvider>
    );

    expect(filmHooks.useFilms).toHaveBeenCalledWith(characterDetails.films);
    expect(homeWorldHooks.useHomeWorld).toHaveBeenCalledWith(
      characterDetails.homeworld
    );
  });
});
