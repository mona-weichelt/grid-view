import data from "../../data/grid-items.json";
import mockData from "../../data/mock-data.json";
import useData, { decode } from "./useData";

describe("Use data hook", () => {
  it("returns 'production' data correctly", () => {
    const method = jest.fn(() => useData());
    method();
    expect(method).toHaveReturnedWith(
      data.map((item, index) => {
        return {
          ...item,
          title: decode(item.title),
          description: decode(item.description),
          id: index.toString(),
        };
      })
    );
  });

  it("returns mock data correctly", () => {
    const method = jest.fn(() => useData(true));
    method();
    expect(method).toHaveReturnedWith(
      mockData.map((item, index) => {
        return {
          ...item,
          title: decode(item.title),
          description: decode(item.description),
          id: index.toString(),
        };
      })
    );
  });
});
