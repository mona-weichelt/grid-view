import { GridItem } from "@/components/GridView";
import data from "../../data/grid-items.json";
import mockData from "../../data/mock-data.json";

export const decode = (str: string): string => {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
};

const useData = (mock = false): GridItem[] => {
  if (mock) {
    return mockData.map((item, index) => {
      return {
        ...item,
        title: decode(item.title),
        description: decode(item.description),
        id: index.toString(),
      };
    });
  } else {
    return data.map((item, index) => {
      return {
        ...item,
        title: decode(item.title),
        description: decode(item.description),
        id: index.toString(),
      };
    });
  }
};

export default useData;
