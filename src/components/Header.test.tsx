import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header", () => {
  test("displays Star Wars header", async () => {
    render(<Header />);
    expect(screen.getByText("Star Wars")).toBeInTheDocument();
  });
});
