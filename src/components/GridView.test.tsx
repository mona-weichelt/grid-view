import useData from "@/hooks/useData";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import GridView from "./GridView";

describe("Grid view", () => {
  const data = useData(true);

  it("renders elements from input data", () => {
    render(<GridView data={data} />);
    const items = screen.getAllByRole("heading", { level: 1 });
    expect(items).toHaveLength(6);
  });

  it("does not render more elements than the page size", () => {
    render(<GridView data={data} firstPageSize={2} />);
    const items = screen.getAllByRole("heading", { level: 1 });
    expect(items).toHaveLength(2);
  });

  it("shows load more button", () => {
    render(<GridView data={data} firstPageSize={2} />);
    const button = screen.getByRole("button", { name: "Load more!" });
    expect(button).toBeInTheDocument();
  });

  it("loads the correct number of items on pagination", async () => {
    render(<GridView data={data} firstPageSize={2} pageSize={1} />);

    const button = screen.getByRole("button", { name: "Load more!" });
    await userEvent.click(button);

    const items = screen.getAllByRole("heading", { level: 1 });
    expect(items).toHaveLength(3);
  });
});
