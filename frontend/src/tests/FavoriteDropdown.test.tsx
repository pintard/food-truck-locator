import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import FavoriteDropdown from "../components/FavoriteDropdown";
import { ThemeProvider } from "../context/ThemeContext";

jest.mock("axios");

describe("FavoriteDropdown", () => {
  it("displays favorite food trucks", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        { _id: "1", Applicant: "Truck 1", Address: "123 Street" },
        { _id: "2", Applicant: "Truck 2", Address: "456 Avenue" },
      ],
    });

    render(
      <ThemeProvider>
        <FavoriteDropdown closeDropdown={() => {}} />
      </ThemeProvider>
    );

    await screen.findByText("Truck 1");
    await screen.findByText("Truck 2");
  });
});
