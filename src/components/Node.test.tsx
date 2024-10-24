import { render, screen } from "@testing-library/react";
import { Node } from "./Node";

describe("Node Component", () => {
  test("renders without crashing", () => {
    render(<Node label="Hero Name" iconType="person" />);
    expect(screen.getByText("Hero Name")).toBeInTheDocument();
  });
});
