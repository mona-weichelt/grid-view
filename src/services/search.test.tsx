import useData from "@/hooks/useData";
import search from "./search";

describe("search function", () => {
  const data = useData(true);

  it("returns a found item", () => {
    const mockSearch = jest.fn((term) => search.findInItemList(term, data));
    mockSearch("Stay wired");
    expect(mockSearch).toHaveReturnedWith([
      {
        title: "Stay wired",
        description: "Stay wired",
        imagePath:
          "https://images.unsplash.com/photo-1563240381-5ccf7690ca08?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTV8fG5lb258ZW58MHx8MHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60",
      },
    ]);
  });

  it("returns input if search term is empty", () => {
    const mockSearch = jest.fn((term) => search.findInItemList(term, data));
    mockSearch("");
    expect(mockSearch).toHaveReturnedWith(data);
  });
});
