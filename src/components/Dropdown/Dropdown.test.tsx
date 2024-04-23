import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dropdown from "./Dropdown";
import React from "react";

describe("Dropdown Component", () => {
  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
  ];
  const initialValue = "1";

  test("renders the Dropdown component with correct initial value and options", () => {
    const handleChange = jest.fn();

    render(
      <Dropdown
        options={options}
        onChange={handleChange}
        value={initialValue}
      />
    );

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();

    options.forEach((option) => {
      const optionElement = screen.getByRole("option", { name: option.label });
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(option.value);
    });

    expect(dropdown).toHaveValue(initialValue);
  });

  test("calls onChange handler when value changes", async () => {
    const handleChangeMock = jest.fn();

    const handleChange = (event: React.ChangeEvent) => {
      handleChangeMock(event);
    };
    render(
      <Dropdown
        options={options}
        onChange={handleChange}
        value={initialValue}
      />
    );

    const dropdown = screen.getByRole("combobox");

    userEvent.selectOptions(dropdown, "2");

    await waitFor(() => {
      expect(handleChangeMock).toHaveBeenCalled();
    });
  });
});
