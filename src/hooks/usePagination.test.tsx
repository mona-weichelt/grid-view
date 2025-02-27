import { renderHook } from "@testing-library/react";
import useData from "./useData";
import usePagination from "./usePagination";

describe("pagination", () => {
  const data = useData();

  it("returns the correct slice of data", () => {
    const { result } = renderHook(() => usePagination(data, 4));

    expect(result.current.data).toHaveLength(4);
  });
});
