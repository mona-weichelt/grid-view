"use client";

import GridView from "@/components/GridView";
import data from "../../data/grid-items.json";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <header className="sticky top-0 bg-white p-2 flex flex-row justify-between items-center shadow-md">
        <h1 className="hidden sm:block">Mona's Grid View</h1>
        <input
          placeholder="Search for grid items..."
          className="p-2 flex-1 rounded-md border hover:border-blue-500"
        />
      </header>
      <main className="flex-1">
        <GridView data={data} firstPageSize={2} pageSize={1} />
      </main>
      <footer className="p-8 text-center bg-pink-300">
        <p>Copyright © 2025 Mona Weichelt</p>
      </footer>
    </div>
  );
}
