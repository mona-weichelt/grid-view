import data from "../../data/grid-items.json";
import mockData from "../../data/mock-data.json";
import useData from "./useData";

describe("Use data hook", () => {
  it("returns 'production' data correctly", () => {
    const method = jest.fn(() => useData());
    method();
    expect(method).toHaveReturnedWith(data);
  });

  it("returns mock data correctly", () => {
    const method = jest.fn(() => useData(true));
    method();
    expect(method).toHaveReturnedWith(mockData);
  });
});
