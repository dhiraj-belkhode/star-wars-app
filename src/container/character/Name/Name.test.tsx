import { render, screen } from "@testing-library/react";
import CharacterName from "./Name";
import { TypographyProps } from "@mui/material";

describe("CharacterName Component", () => {
  test("renders without crashing", () => {
    render(<CharacterName name="Luke Skywalker" />);
  });

  test("renders correct character name", () => {
    const name = "Luke Skywalker";

    render(<CharacterName name={name} />);

    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test("applies additional Typography props", () => {
    const props = {
      variant: "h4",
      color: "primary",
    } as TypographyProps;

    const name = "Luke Skywalker";

    render(<CharacterName name={name} {...props} />);

    const typographyElement = screen.getByText(name);
    expect(typographyElement).toBeInTheDocument();

    expect(typographyElement).toHaveClass("MuiTypography-h4");
  });
});
