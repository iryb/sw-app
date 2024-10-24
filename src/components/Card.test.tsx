import { fireEvent, render, screen } from "@testing-library/react";
import { Card } from "./Card";
import { useHeroContext } from "../contexts/index";
import { useModal } from "../hooks/index";
import { HeroModal } from "./HeroModal";

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
  const mockedUseHeroContext = useHeroContext as jest.Mock;
  const mockedUseModal = useModal as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseHeroContext.mockReturnValue({
      selectedHero: null,
      selectHero: selectHeroMock,
    });
    mockedUseModal.mockReturnValue({
      isOpened: false,
      handleClose: jest.fn(),
    });
  });

  test("displays hero name correctly", () => {
    render(<Card id="1" name="Test Hero" starships={[1, 2]} />);
    expect(screen.getByText("Test Hero")).toBeInTheDocument();
  });

  test("selects hero on click", () => {
    mockedUseHeroContext.mockReturnValue({
      selectedHero: { id: "1", name: "Selected Hero", starships: [1, 2] },
      selectHero: selectHeroMock,
    });

    render(<Card id="1" name="Selected Hero" starships={[1, 2]} />);
    fireEvent.click(screen.getByRole("button"));

    expect(selectHeroMock).toHaveBeenCalledWith({
      id: "1",
      name: "Selected Hero",
      starships: [1, 2],
    });
  });

  test("renders HeroModal when hero is selected", () => {
    mockedUseHeroContext.mockReturnValue({
      selectedHero: { id: "1", name: "Selected Hero", starships: [1, 2] },
      selectHero: selectHeroMock,
    });

    render(<Card id="1" name="Selected Hero" starships={[1, 2]} />);
    fireEvent.click(screen.getByRole("button"));

    expect(HeroModal).toHaveBeenCalledTimes(1);
  });
});
