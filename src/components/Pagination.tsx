import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

type PaginationProps = {
  count: number;
  currentPage: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export const Pagination = ({
  count,
  currentPage,
  handleChangePage,
}: PaginationProps) => {
  return (
    <MuiPagination
      count={count}
      page={currentPage}
      onChange={handleChangePage}
    />
  );
};
