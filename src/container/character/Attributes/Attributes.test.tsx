import { fireEvent, render, screen } from "@testing-library/react";
import Attributes from "./Attributes";
import * as characterHooks from "../../../hooks/characters";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getIdFromUrl } from "../../../utils/getIdFromUrl";

const mockUrl = "https://swapi.dev/api/people/1";
const queryClient = new QueryClient();

describe("Attributes Component", () => {
  const updateCharacterMock = jest.fn();
  const updateCharactersMock = jest.fn();

  beforeEach(() => {
    updateCharacterMock.mockClear();
    updateCharactersMock.mockClear();

    jest
      .spyOn(characterHooks, "useUpdateCharacter")
      .mockReturnValue(updateCharacterMock);

    jest
      .spyOn(characterHooks, "useUpdateCharacters")
      .mockReturnValue(updateCharactersMock);
  });

  test("renders the component with correct initial values", () => {
    render(
      <Attributes
        height="180 cm"
        hair_color="Black"
        eye_color="Brown"
        gender="n/a"
        id={getIdFromUrl(mockUrl)}
      />
    );

    expect(screen.getByText("Height: 180 cm")).toBeInTheDocument();
    expect(screen.getByText("Hair color: Black")).toBeInTheDocument();
    expect(screen.getByText("Eye color: Brown")).toBeInTheDocument();
    expect(screen.getByText("Gender: n/a")).toBeInTheDocument();
  });

  test("calls update functions when dropdown changes", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Attributes
          height="180 cm"
          hair_color="Black"
          eye_color="Brown"
          gender="male"
          id={getIdFromUrl(mockUrl)}
        />
      </QueryClientProvider>
    );

    const dropdown = screen.getByRole("combobox");
    fireEvent.change(dropdown, "female");

    expect(updateCharacterMock).toHaveBeenCalled();
    expect(updateCharactersMock).toHaveBeenCalled();
  });
});
