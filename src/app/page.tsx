"use client";

import GridView, { GridItem } from "@/components/GridView";
import PageNavigator from "@/components/PageNavigator";
import TileCreationForm from "@/components/TileCreationForm";
import useData from "@/hooks/useData";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useRef } from "react";
import { FaPlus } from "react-icons/fa6";

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
  const show = useSearchParams().get("show");
  const [customTiles, setCustomTiles] = useState<GridItem[]>([]);
  const data = useData();
  const dataWithCustomTiles = data.concat(customTiles);
  const { filteredData, setSearchTerm, isSearchFailed } =
    useSearch(dataWithCustomTiles);
  const {
    data: pagedData,
    pageCount,
    currentPage,
    setPage,
  } = usePagination(filteredData, 10);

  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
        <header className="z-20 sticky top-0 bg-pink-400 p-2 px-4 flex flex-row justify-between items-center shadow-md">
          <h1 className="hidden flex-1 sm:block text-2xl font-bold text-white">
            Mona's Grid View
          </h1>
          <input
            ref={searchBarRef}
            type="search"
            placeholder="Search for grid items..."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            className="p-2 flex-1 rounded-md border hover:border-blue-500"
          />
          <div className="flex-1 hidden md:block" />
        </header>
        <main className="flex-1 flex flex-col bg-gray-200">
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
            <div className="flex-1 flex flex-col mx-auto py-4 px-4 lg:px-0">
              <PageNavigator
                key={"navigator-1"}
                pageCount={pageCount}
                currentPage={currentPage}
                onPress={setPage}
                className="mb-4 justify-end"
              />
              <GridView data={pagedData} className="flex-1" />
              <PageNavigator
                key={"navigator-2"}
                pageCount={pageCount}
                currentPage={currentPage}
                onPress={setPage}
                className="mt-4 justify-end"
              />
            </div>
          )}
          <Link
            scroll={false}
            href="/?show=true"
            className="sticky bottom-4 right-4 ml-auto mb-4 h-16 w-16 rounded-full bg-pink-500 flex justify-center items-center hover:scale-105"
          >
            <FaPlus color="white" size={32} />
          </Link>
        </main>
        <footer className="p-8 text-center bg-pink-300">
          <p>Copyright © 2025 Mona Weichelt</p>
        </footer>
        {show && (
          <Link
            scroll={false}
            href="/"
            className="fixed z-50 w-full h-full bg-black bg-opacity-35"
          />
        )}
        {show && (
          <TileCreationForm
            onSubmit={(tile) => {
              tile.then((item) => {
                setCustomTiles((x) => [...x, item]);
              });
            }}
            className="z-50"
          />
        )}
      </div>
    </>
  );
}
