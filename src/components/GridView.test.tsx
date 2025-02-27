import useData from "@/hooks/useData";
import { render, screen } from "@testing-library/react";
import GridView from "./GridView";

describe("Grid view", () => {
  const data = useData(true);

  it("renders elements from input data", () => {
    render(<GridView data={data} />);
    const items = screen.getAllByRole("heading", { level: 1 });
    expect(items).toHaveLength(6);
  });
});
