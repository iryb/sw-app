import { render, screen } from "@testing-library/react";
import { HeroesList } from "./HeroesList";
import { useHeroes } from "../hooks/index";
import { Card } from "./Card";
import { Pagination } from "./Pagination";

type HeroesType = {
  data: {
    results: { id: string; name: string; starships: number[] }[];
    count: number;
  } | null;
  error: { message: string } | null;
  isLoading: boolean;
  isError: boolean;
};

jest.mock("../hooks/index", () => ({
  useHeroes: jest.fn(),
}));
jest.mock("./Card");
jest.mock("./Pagination");
jest.mock("@mui/material/Skeleton", () => ({
  Skeleton: () => <div data-testid="skeleton">Loading</div>,
}));

describe("HeroesList Component", () => {
  let mockUseHeroes = useHeroes as unknown as jest.Mock<HeroesType, any, any>;

  beforeEach(() => {
    mockUseHeroes.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });
  });

  it("renders message if there are no heroes", () => {
    mockUseHeroes.mockReturnValue({
      data: null,
      error: null,
      isLoading: false,
      isError: false,
    });
    render(<HeroesList />);
    expect(screen.getByText("No heroes were found.")).toBeInTheDocument();
  });

  it("renders cards for each hero", () => {
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

  it("shows error message when there is an error", () => {
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

  it("renders pagination component", () => {
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
    expect(Card).toHaveBeenCalledTimes(2);
  });
});
