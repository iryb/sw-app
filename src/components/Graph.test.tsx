import { render, screen } from "@testing-library/react";
import { Graph } from "./Graph";
import { useHeroContext } from "../contexts/index";
import {
  usePersonFilms,
  usePersonStarships,
  useReactFlow,
} from "../hooks/index";

// Mock the hooks used in Graph
jest.mock("../hooks/index", () => ({
  usePersonFilms: jest.fn(),
  usePersonStarships: jest.fn(),
  useReactFlow: jest.fn(),
}));

jest.mock("../contexts/index", () => ({
  useHeroContext: jest.fn(),
}));

describe("Graph Component", () => {
  const mockAddNode = jest.fn();
  const mockAddNewEdge = jest.fn();

  const mockedUseHeroContext = useHeroContext as jest.Mock;
  const mockedUsePersonFilms = usePersonFilms as jest.Mock;
  const mockedUsePersonStarships = usePersonStarships as jest.Mock;
  const mockedUseReactFlow = useReactFlow as jest.Mock;

  beforeEach(() => {
    mockedUseHeroContext.mockReturnValue({
      selectedHero: { name: "Test Hero" },
    });
    mockedUsePersonFilms.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
    });
    mockedUsePersonStarships.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
    });
    mockedUseReactFlow.mockReturnValue({
      addNode: mockAddNode,
      addNewEdge: mockAddNewEdge,
      nodes: [],
      edges: [],
    });
  });

  test("displays loading text while fetching data", () => {
    mockedUsePersonFilms.mockReturnValue({
      data: { results: [] },
      isLoading: true,
      error: null,
    });
    render(<Graph />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("shows error message when films or starships fail to load", () => {
    mockedUsePersonFilms.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: { message: "Error loading films" },
    });
    render(<Graph />);
    expect(screen.getByText("Error loading data")).toBeInTheDocument();
  });

  test("renders nodes and edges correctly based on fetched data", () => {
    mockedUsePersonFilms.mockReturnValue({
      data: {
        results: [{ id: 1, title: "Film 1", starships: [] }],
      },
      isLoading: false,
      error: null,
    });
    mockedUsePersonStarships.mockReturnValue({
      data: { results: [] },
      isLoading: false,
      error: null,
    });

    render(<Graph />);
    expect(mockAddNode).toHaveBeenCalledWith(
      expect.stringContaining("film-n-1"),
      expect.anything(),
      expect.anything()
    );
    expect(mockAddNewEdge).toHaveBeenCalledWith(
      expect.stringContaining("film-e-1"),
      expect.anything(),
      expect.anything()
    );
  });
});
