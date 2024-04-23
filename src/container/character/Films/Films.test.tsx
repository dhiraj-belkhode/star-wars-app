import { render, screen } from "@testing-library/react";
import { Film } from "../../../types/Film.type";
import Films from "./Films";

describe("Films Component", () => {
  const films: (Film | undefined)[] = [
    { title: "A New Hope" },
    { title: "The Empire Strikes Back" },
    { title: "Return of the Jedi" },
  ];

  const filmsWithUndefined: (Film | undefined)[] = [
    { title: "A New Hope" },
    undefined,
    { title: "Return of the Jedi" },
  ];

  test("renders without crashing", () => {
    render(<Films films={films} />);
  });

  test("renders correct film titles", () => {
    render(<Films films={films} />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("The Empire Strikes Back")).toBeInTheDocument();
    expect(screen.getByText("Return of the Jedi")).toBeInTheDocument();
  });

  test("handles empty array of films correctly", () => {
    render(<Films films={[]} />);

    const filmsList = screen.queryByText("Films");
    expect(filmsList).not.toBeNull();
    expect(screen.queryByText("A New Hope")).not.toBeInTheDocument();
    expect(
      screen.queryByText("The Empire Strikes Back")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Return of the Jedi")).not.toBeInTheDocument();
  });

  test("handles undefined films correctly", () => {
    render(<Films films={filmsWithUndefined} />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("Return of the Jedi")).toBeInTheDocument();
    expect(
      screen.queryByText("The Empire Strikes Back")
    ).not.toBeInTheDocument();
  });
});
