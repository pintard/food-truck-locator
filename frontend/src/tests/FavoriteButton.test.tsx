import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FavoriteButton from "../components/FavoriteButton";

describe("FavoriteButton", () => {
  it("renders the button correctly", () => {
    render(<FavoriteButton />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Favorites");
  });

  it("opens and closes the dropdown", () => {
    render(<FavoriteButton />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(screen.getByText("Favorite Food Trucks")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));

    expect(screen.queryByText("Favorite Food Trucks")).not.toBeInTheDocument();
  });
});
