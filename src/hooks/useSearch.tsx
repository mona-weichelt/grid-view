import search from "@/services/search";
import { Dispatch, SetStateAction, useState } from "react";

type Search<T> = {
  searchTerm: string;
  filteredData: T[];
  isSearchActive: boolean;
  hasResults: boolean;
  isSearchFailed: boolean;
  setSearchTerm: Dispatch<SetStateAction<string>>;
};

const useSearch = <T,>(
  data: T[],
  searchFunction: (searchTerm: string, data: T[]) => T[],
  initialSearchTerm = ""
): Search<T> => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const filteredData = searchFunction(searchTerm, data);
  const isSearchActive = searchTerm.length > 0;
  const hasResults = filteredData.length > 0;
  const isSearchFailed = isSearchActive && !hasResults;

  return {
    searchTerm,
    filteredData,
    isSearchActive,
    hasResults,
    isSearchFailed,
    setSearchTerm,
  };
};

export default useSearch;
