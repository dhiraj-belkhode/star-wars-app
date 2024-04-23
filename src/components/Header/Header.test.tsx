import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";

describe("Header Component", () => {
  test("renders the Header component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();

    const typographyElement = screen.getByText("Star Wars");
    expect(typographyElement).toBeInTheDocument();

    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/");
    expect(linkElement).toHaveStyle({
      textDecoration: "none",
      color: "inherit",
    });
  });

  test("navigates to home when the link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe("/");
  });
});
