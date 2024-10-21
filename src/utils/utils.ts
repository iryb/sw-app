export const transformPaginationCount = (count: number, perPage: number) => {
  return Math.ceil(count / perPage);
};
