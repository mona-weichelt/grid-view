import { GridItem } from "@/components/GridView";
import data from "../../data/grid-items.json";
import mockData from "../../data/mock-data.json";

const decode = (str: string): string => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

// A hook to fetch the data for the grid.
// Formatting or sanitizing of data could happen here.
// It could also be changed to an API call here.

const useData = (mock = false): GridItem[] => {
  if (mock) {
    return mockData;
  } else {
    return data.map((item: GridItem) => {
      return {
        ...item,
        title: decode(item.title),
        description: decode(item.description),
      };
    });
  }
};

export default useData;
