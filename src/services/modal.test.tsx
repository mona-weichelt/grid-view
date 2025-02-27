import { renderHook } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import modal from "./modal";

jest.mock("next/navigation");
(useSearchParams as jest.Mock).mockReturnValue({ get: jest.fn() });

describe("Modal", () => {
  it("does something", () => {
    renderHook(() => modal.useIsModalVisible());
    expect(useSearchParams).toHaveBeenCalled();
  });
});
