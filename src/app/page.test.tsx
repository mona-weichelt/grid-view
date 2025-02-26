import { getByRole, render, screen } from "@testing-library/react";
import Home from "./page";

describe("home page", () => {
  it("renders copyright notice", () => {
    render(<Home />);
    const copyright = screen.getByText("Copyright © 2025 Mona Weichelt");
    expect(copyright).toBeInTheDocument();
  });
});
