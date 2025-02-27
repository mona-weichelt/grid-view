const compareLowercase = (a: string, b: string) => {
  return a.toLowerCase().includes(b.toLowerCase());
};

const findInItemList = (term: string, data: any[]): any[] => {
  if (term === "") return data;
  return data.filter((item) => {
    return (
      compareLowercase(item.description, term) ||
      compareLowercase(item.title, term)
    );
  });
};

export default { findInItemList };
