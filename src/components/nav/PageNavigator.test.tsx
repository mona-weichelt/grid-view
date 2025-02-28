import { render, screen } from "@testing-library/react";
import PageNavigator from "./PageNavigator";

describe("Page navigator", () => {
  it("renders dots", () => {
    render(
      <PageNavigator currentPage={5} pageCount={20} onPress={jest.fn()} />
    );
    const dots = screen.getAllByRole("img");
    expect(dots[0]).toBeInTheDocument();
  });

  it("is hidden when there are too few pages", () => {
    render(<PageNavigator currentPage={0} pageCount={1} onPress={jest.fn()} />);
    expect(screen.queryByText("1")).toBeNull();
  });
});
