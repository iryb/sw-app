import { render, screen } from "@testing-library/react";
import { Image } from "./Image";
import { useQuery } from "@tanstack/react-query";

jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(),
}));

describe("Image Component", () => {
  test("displays error message on failure", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: true,
      data: null,
    });

    render(<Image id="1" alt="Test Image" width={100} height={100} />);

    expect(screen.getByText("Error loading image")).toBeInTheDocument();
  });

  test("renders the image once loaded", () => {
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: "https://example.com/image.jpg",
    });

    render(<Image id="1" alt="Test Image" width={100} height={100} />);

    const img = screen.getByAltText("Test Image");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/image.jpg");
  });
});
