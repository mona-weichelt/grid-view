import modal from "@/services/modal";
import search from "@/services/search";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import Home from "./page";

describe("home page", () => {
  const spyUseSearchParams = jest.spyOn(modal, "useIsModalVisible");
  spyUseSearchParams.mockImplementation(() => null);

  const spySearch = jest.spyOn(search, "findInItemList");
  spySearch.mockImplementation(() => []);

  it("renders copyright notice", () => {
    render(<Home />);
    const copyright = screen.getByText("Copyright © 2025 Mona Weichelt");
    expect(copyright).toBeInTheDocument();
  });

  it("renders 'no items found' state", async () => {
    render(<Home />);

    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, "Stay");

    const sorry = screen.getByText(
      "We could not find anything matching your search."
    );
    expect(sorry).toBeInTheDocument();
  });

  it("resets search after clicking on 'no results' screen", async () => {
    render(<Home />);

    const searchInput = screen.getByRole("searchbox");
    await userEvent.type(searchInput, "Stay");

    const button = screen.getByRole("button", {
      name: "We could not find anything matching your search. Click to clear the search :3",
    });
    userEvent.click(button);

    expect(searchInput.textContent).toBe("");
  });
});
