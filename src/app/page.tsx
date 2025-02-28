"use client";

import GridView, { GridItem } from "@/components/GridView";
import NoResultScreen from "@/components/search/NoResultsScreen";
import Modal from "@/components/modal/Modal";
import TileCreationForm from "@/components/modal/TileCreationForm";
import ModalLink from "@/components/nav/ModalLink";
import PageNavigator from "@/components/nav/PageNavigator";
import useData from "@/hooks/useData";
import usePagination from "@/hooks/usePagination";
import useSearch from "@/hooks/useSearch";
import modal from "@/services/modal";
import search from "@/services/search";
import { Suspense, useRef, useState } from "react";

export default function Home() {
  const show = modal.useIsModalVisible();
  const [customTiles, setCustomTiles] = useState<GridItem[]>([]);
  const data = useData();
  const dataWithCustomTiles = data.concat(customTiles);
  const { filteredData, setSearchTerm, isSearchFailed } = useSearch(
    dataWithCustomTiles,
    search.findInItemList
  );
  const {
    data: pagedData,
    pageCount,
    currentPage,
    setPage,
  } = usePagination(filteredData, 12);

  const searchBarRef = useRef<HTMLInputElement>(null);

  return (
    <Suspense>
      <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
        <header className="z-20 sticky top-0 bg-pink-400 p-2 px-4 flex flex-row justify-between items-center shadow-md">
          <h1 className="hidden flex-1 sm:block text-2xl font-bold text-white">
            Mona&apos;s Grid View
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
                className="sticky top-16 z-20 mb-4 self-end bg-white w-fit p-2 rounded-lg shadow-lg"
              />
              <GridView key={"grid-view"} data={pagedData} className="flex-1" />
            </div>
          )}
          <ModalLink />
        </main>
        <footer className="p-8 text-center bg-pink-300">
          <p>Copyright © 2025 Mona Weichelt</p>
        </footer>
        {show && (
          <Modal>
            <TileCreationForm
              onSubmit={(tile) => {
                tile.then((item) => {
                  setCustomTiles((x) => [...x, item]);
                });
              }}
              className="z-50 h-fit mx-4"
            />
          </Modal>
        )}
      </div>
    </Suspense>
  );
}
