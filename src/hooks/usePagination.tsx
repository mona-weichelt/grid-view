import { Dispatch, SetStateAction, useState } from "react";

type Pagination<T> = {
  data: T[];
  currentPage: number;
  pageCount: number;
  setPage: Dispatch<SetStateAction<number>>;
};

const usePagination = <T,>(data: T[], pageSize = 10): Pagination<T> => {
  const [currentPage, setCurrentPage] = useState(0);
  const numberOfPages = Math.ceil(data.length / pageSize);

  const visibleData = data.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  return {
    data: visibleData,
    currentPage: currentPage,
    pageCount: numberOfPages,
    setPage: setCurrentPage,
  };
};

export default usePagination;
