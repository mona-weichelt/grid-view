"use client";

import GridView from "@/components/GridView";
import useData from "@/hooks/useData";
import search from "@/services/search";
import { useRef, useState } from "react";

const NoResultScreen = ({ onPress = () => {} }: { onPress?: () => void }) => {
  return (
    <button
      className="flex-1 flex flex-col justify-center items-center"
      onClick={onPress}
    >
      <h1>We could not find anything matching your search.</h1>
      <h2>Click to clear the search :3</h2>
    </button>
  );
};

export default function Home() {
  const data = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const searchBarRef = useRef<any>(null);

  const filteredData = search.findInItemList(searchTerm, data);
  const isSearchActive = searchTerm.length > 0;
  const hasResults = filteredData.length > 0;
  const isSearchFailed = isSearchActive && !hasResults;

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="z-50 sticky top-0 bg-pink-400 p-2 px-4 flex flex-row justify-between items-center shadow-md">
        <h1 className="hidden flex-1 sm:block text-2xl font-bold text-white">
          Mona's Grid View
        </h1>
        <input
          ref={searchBarRef}
          type="search"
          placeholder="Search for grid items..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 flex-1 rounded-md border hover:border-blue-500"
        />
        <div className="flex-1 hidden md:block" />
      </header>
      <main className="flex-1 flex bg-gray-200 justify-center">
        {isSearchFailed ? (
          <NoResultScreen
            onPress={() => {
              if (searchBarRef.current) {
                searchBarRef.current.value = "";
              }
              setSearchTerm("");
            }}
          />
        ) : (
          <GridView data={filteredData} />
        )}
      </main>
      <footer className="p-8 text-center bg-pink-300">
        <p>Copyright © 2025 Mona Weichelt</p>
      </footer>
    </div>
  );
}
