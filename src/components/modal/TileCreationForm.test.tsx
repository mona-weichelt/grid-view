import { render, screen } from "@testing-library/react";
import picture from "../../data/bunny.jpg";
import TileCreationForm, { createTileData } from "./TileCreationForm";

const mockFile = new File([picture.src], "picture");

describe("Tile creation form", () => {
  it("renders", () => {
    render(<TileCreationForm onSubmit={jest.fn()} />);
    expect(screen.getByText("Create your own tile!")).toBeInTheDocument();
  });

  it("creates tile data", async () => {
    const result = createTileData(
      mockFile,
      "my title",
      "my description",
      jest.fn()
    );

    expect((await result).title).toBe("my title");
    expect((await result).description).toBe("my description");
    expect((await result).imagePath).toBeTruthy();
  });
});
