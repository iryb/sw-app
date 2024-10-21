import { transformPaginationCount } from "./utils";

test("Pagination count should be 9 if there are 82 people and we display 10 people per page", () => {
  expect(transformPaginationCount(82, 10)).toBe(9);
});
