import { render } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader Component", () => {
  test("renders without crashing", () => {
    render(<Loader />);
  });

  test("renders with default color secondary", () => {
    const { getByRole } = render(<Loader />);

    const progressIndicator = getByRole("progressbar");

    expect(progressIndicator).toHaveClass("MuiCircularProgress-colorSecondary");
  });

  test("accepts and applies custom props", () => {
    const { getByRole } = render(<Loader size={40} thickness={5} />);

    const progressIndicator = getByRole("progressbar");

    const style = window.getComputedStyle(progressIndicator);
    expect(style.width).toBe("40px");
    expect(style.height).toBe("40px");
  });
});
