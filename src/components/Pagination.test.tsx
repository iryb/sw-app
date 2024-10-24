import { render, screen, fireEvent } from "@testing-library/react";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  const handleChangePage = jest.fn();

  test("renders pagination component", () => {
    render(
      <Pagination
        count={5}
        currentPage={1}
        handleChangePage={handleChangePage}
      />
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  test("triggers handleChangePage on page change", () => {
    render(
      <Pagination
        count={5}
        currentPage={1}
        handleChangePage={handleChangePage}
      />
    );
    fireEvent.click(screen.getByText("2"));
    expect(handleChangePage).toHaveBeenCalledWith(expect.anything(), 2);
  });
});
