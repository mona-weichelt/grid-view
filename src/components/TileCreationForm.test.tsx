import { render, screen } from "@testing-library/react";
import TileCreationForm, { createTileData } from "./TileCreationForm";
import { userEvent } from "@testing-library/user-event";
import useData from "@/hooks/useData";
import picture from "../../data/bunny.jpg";

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

  it("returns error state", async () => {
    const spyReadFile = jest.spyOn(FileReader.prototype, "readAsDataURL");

    const setStateMock = jest.fn();

    const result = createTileData(
      mockFile,
      "my title",
      "my description",
      setStateMock
    );

    expect((await result).title).toBe("my title");
    expect(setStateMock).toHaveBeenCalledWith(false);
  });

  it("submits data", async () => {
    const submit = jest.fn();
    render(<TileCreationForm onSubmit={submit} />);

    const inputs = screen.getAllByRole("textbox");
    userEvent.type(inputs[0], "my title");
    userEvent.type(inputs[1], "my description");

    const button = screen.getByRole("button");
    userEvent.click(button);

    expect(submit).toHaveBeenCalled();
  });
});
