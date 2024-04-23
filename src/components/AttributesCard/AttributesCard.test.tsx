import { Typography } from "@mui/material";
import AttributesCard from "./AttributesCard";
import { render } from "@testing-library/react";

describe("AttributesCard component", () => {
  test("renders the card with children", () => {
    const { getByText } = render(
      <AttributesCard>This is some content</AttributesCard>
    );

    expect(getByText("This is some content")).toBeInTheDocument();
  });

  test("renders a custom child component", () => {
    const { getByText } = render(
      <AttributesCard>
        <Typography variant="body2">Custom Content</Typography>
      </AttributesCard>
    );

    expect(getByText("Custom Content")).toBeInTheDocument();
  });
});
