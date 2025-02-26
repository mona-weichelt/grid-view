import search from "@/services/search";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Home from "./page";

describe("home page", () => {
  it("renders copyright notice", () => {
    render(<Home />);
    const copyright = screen.getByText("Copyright © 2025 Mona Weichelt");
    expect(copyright).toBeInTheDocument();
  });

  it("renders 'no items found' state", async () => {
    render(<Home />);

    const spySearch = jest.spyOn(search, "findInItemList");
    spySearch.mockImplementation(() => []);

    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, "Stay");

    const sorry = screen.getByText("Sorry :c");
    expect(sorry).toBeInTheDocument();
  });
});
