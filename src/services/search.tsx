import { GridItem } from "@/components/GridView";

const compareLowercase = (a: string, b: string) => {
  return a.toLowerCase().includes(b.toLowerCase());
};

const findInItemList = (term: string, data: GridItem[]): GridItem[] => {
  if (term === "") return data;
  return data.filter((item) => {
    return (
      compareLowercase(item.description, term) ||
      compareLowercase(item.title, term)
    );
  });
};

const search = {
  findInItemList,
};

export default search;
