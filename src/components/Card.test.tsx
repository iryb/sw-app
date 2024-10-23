import { render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { useHeroContext } from "../contexts/index";

type HeroContextType = {
  selectedHero: { id: string; name: string; starships: number[] } | null;
  selectHero: (hero: { id: string; name: string; starships: number[] }) => void;
};

jest.mock("./HeroModal");
jest.mock("./Image");

jest.mock("../contexts/index", () => ({
  useHeroContext: jest.fn(),
}));
jest.mock("../hooks/index", () => ({
  useModal: jest.fn(),
}));

describe("Card Component", () => {
  const selectHeroMock = jest.fn();

  // Declare the mocked return type of useHeroContext
  const mockedUseHeroContext = useHeroContext as jest.Mock<HeroContextType>;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    mockedUseHeroContext.mockReturnValue({
      selectedHero: null,
      selectHero: selectHeroMock,
    });
  });

  test("renders without crashing", () => {
    render(<Card id="1" name="Test Hero" starships={[1, 2]} />);
    expect(screen.getByText("Test Hero")).toBeInTheDocument();
  });

  // test("displays hero name correctly", () => {
  //   render(<Card id="1" name="Test Hero" starships={[1, 2]} />);
  //   expect(screen.getByText("Test Hero")).toBeInTheDocument();
  // });

  // test("calls selectHero on click", () => {
  //   render(<Card id="1" name="Test Hero" starships={[1, 2]} />);
  //   expect(selectHeroMock).toHaveBeenCalledWith({
  //     id: "1",
  //     name: "Test Hero",
  //     starships: [1, 2],
  //   });
  // });
});
