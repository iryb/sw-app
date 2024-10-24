import { render, screen } from "@testing-library/react";
import { HeroesList } from "./HeroesList";
import { useHeroes } from "../hooks/index";
import { Card } from "./Card";
import { Pagination } from "./Pagination";

jest.mock("../hooks/index", () => ({
  useHeroes: jest.fn(),
}));
jest.mock("./Card");
jest.mock("./Pagination");

describe("HeroesList Component", () => {
  let mockUseHeroes = useHeroes as jest.Mock;

  beforeEach(() => {
    mockUseHeroes.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });
  });

  test("renders message if there are no heroes", () => {
    mockUseHeroes.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });
    render(<HeroesList />);
    expect(screen.getByText("No heroes were found.")).toBeInTheDocument();
  });

  test("renders cards for each hero", () => {
    mockUseHeroes.mockReturnValue({
      data: {
        results: [
          { id: "1", name: "Hero 1", starships: [1, 2] },
          { id: "2", name: "Hero 2", starships: [3, 4] },
        ],
        count: 2,
      },
      error: null,
      isLoading: false,
      isError: false,
    });

    render(<HeroesList />);
    expect(Card).toHaveBeenCalledTimes(2);
  });

  test("shows error message when there is an error", () => {
    mockUseHeroes.mockReturnValue({
      data: null,
      error: { message: "Error fetching heroes" },
      isLoading: false,
      isError: true,
    });
    render(<HeroesList />);
    expect(
      screen.getByText("Error: Error fetching heroes")
    ).toBeInTheDocument();
  });

  test("renders pagination component", () => {
    mockUseHeroes.mockReturnValue({
      data: {
        results: [
          { id: "1", name: "Hero 1", starships: [1, 2] },
          { id: "2", name: "Hero 2", starships: [3, 4] },
        ],
        count: 20, // Assuming there are 20 total heroes
      },
      error: null,
      isLoading: false,
      isError: false,
    });
    render(<HeroesList />);
    expect(Pagination).toHaveBeenCalledTimes(1);
  });
});
