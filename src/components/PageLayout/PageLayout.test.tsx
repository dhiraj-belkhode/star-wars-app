import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PageLayout from "./PageLayout";

describe("PageLayout Component", () => {
  test("renders Container component", () => {
    render(
      <MemoryRouter>
        <PageLayout />
      </MemoryRouter>
    );

    expect(screen.getByTestId("container")).toBeInTheDocument();
  });
});
