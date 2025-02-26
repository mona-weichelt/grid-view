"use client";

import GridView, { GridItem } from "@/components/GridView";
import data from "../../data/grid-items.json";
import { useState } from "react";

//TODO: include regex
const search = (term: string, data: GridItem[]): GridItem[] =>
  data.filter((item) => {
    return (
      item.description.includes(term) ||
      item.title.includes(term) ||
      item.imagePath.includes(term)
    );
  });

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = search(searchTerm, data);
  const isSearchActive = searchTerm.length > 0;
  const hasResults = filteredData.length > 0;
  const isSearchFailed = isSearchActive && !hasResults;

  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="sticky top-0 bg-white p-2 flex flex-row justify-between items-center shadow-md">
        <h1 className="hidden sm:block">Mona's Grid View</h1>
        <input
          placeholder="Search for grid items..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 flex-1 rounded-md border hover:border-blue-500"
        />
      </header>
      <main className="flex-1">
        {isSearchFailed ? (
          <h1>Sorry :c</h1>
        ) : (
          <GridView data={filteredData} firstPageSize={2} pageSize={1} />
        )}
      </main>
      <footer className="p-8 text-center bg-pink-300">
        <p>Copyright © 2025 Mona Weichelt</p>
      </footer>
    </div>
  );
}
