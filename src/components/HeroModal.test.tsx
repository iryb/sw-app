import { render, screen, fireEvent } from "@testing-library/react";
import { HeroModal } from "./HeroModal";
import { Graph } from "./Graph";

jest.mock("./Graph");

describe("HeroModal Component", () => {
  const handleClose = jest.fn();

  test("renders the modal when open and displays Graph and close button", () => {
    render(<HeroModal open={true} onClose={handleClose} />);

    expect(screen.getByText("Films and Starships")).toBeInTheDocument();

    const closeButton = screen.getByLabelText("close");
    expect(closeButton).toBeInTheDocument();

    expect(Graph).toHaveBeenCalledTimes(1);
  });

  test("closes modal when close button is clicked", () => {
    render(<HeroModal open={true} onClose={handleClose} />);

    const closeButton = screen.getByLabelText("close");
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
