import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThemeSwitchButton from "../components/ThemeSwitchButton";
import { ThemeProvider } from "../context/ThemeContext";

describe("ThemeSwitchButton", () => {
  it("toggles between light and dark mode", () => {
    render(
      <ThemeProvider>
        <ThemeSwitchButton />
      </ThemeProvider>
    );

    const button = screen.getByRole("button");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Light Mode");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Dark Mode");
  });
});
