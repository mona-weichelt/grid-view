import { getByRole, render, screen } from "@testing-library/react";
import Home from "./page";

describe("home page", () => {
  it("renders 'deploy now' button", () => {
    render(<Home />);
    const button = screen.getByRole("link", {
      name: "Vercel logomark Deploy now",
    });
    expect(button).toBeInTheDocument();
  });
});
