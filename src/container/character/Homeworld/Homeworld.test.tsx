import { render, screen } from "@testing-library/react";
import Homeworld from "./Homeworld";

describe("Homeworld Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders correct home planet", () => {
    const homePlanet = "Tatooine";

    render(<Homeworld homeworld={homePlanet} />);

    expect(screen.getByText("Home Planet")).toBeInTheDocument();
    expect(screen.getByText(homePlanet)).toBeInTheDocument();
  });

  test("handles undefined homeworld gracefully", () => {
    render(<Homeworld homeworld={undefined} />);

    expect(screen.getByText("Home Planet")).toBeInTheDocument();

    const homePlanetElement = screen.queryByText(/Tatooine/i);
    expect(homePlanetElement).toBeNull();
  });
});
