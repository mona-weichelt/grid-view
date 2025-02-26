import Image from "next/image";
import { useState } from "react";

export type GridItem = {
  title: string;
  description: string;
  imagePath: string;
};

type GridViewProps = {
  data: GridItem[];
  firstPageSize?: number;
  pageSize?: number;
  [x: string]: any;
};

const getWidthFromSource = (src: string) => {
  const parameterIndex = src.indexOf("w=");

  if (parameterIndex === undefined) return 800;

  const lastIndex = src.indexOf("&", parameterIndex);

  return parseInt(src.slice(parameterIndex + 2, lastIndex || src.length));
};

const GridItem = ({ title, description, imagePath }: GridItem) => {
  return (
    <div className="relative bg-white border shadow-lg rounded-lg flex flex-col overflow-clip hover:scale-105 duration-200 ease-in-out">
      <Image
        className="max-w-64 object-scale-down"
        alt={title}
        src={imagePath}
        width={getWidthFromSource(imagePath)}
        height={800}
      />
      <div className="px-2 py-1 absolute">
        <h1 className="font-bold text-xl text-white">{title}</h1>
      </div>
      <div className="absolute w-full h-full flex justify-center items-center text-center">
        <p className="flex-1 text-white">{description}</p>
      </div>
    </div>
  );
};

const GridView = ({
  data,
  firstPageSize = 12,
  pageSize = 6,
}: GridViewProps) => {
  const [pageNumber, setPageNumber] = useState(0);
  const overflow = Math.max(data.length - firstPageSize, 0);
  const numberOfPages = Math.ceil(overflow / pageSize);

  const visibleData = data.slice(0, firstPageSize + pageNumber * pageSize);

  return (
    <div className="flex flex-col">
      <div className="p-4 md:p-8 gap-4 md:gap-8 space-y-4 md:space-y-8 h-fit columns-1 md:columns-2 lg:columns-3 xl:columns-4">
        {visibleData.map((item) => {
          return <GridItem key={item.imagePath} {...item} />;
        })}
      </div>
      {pageNumber < numberOfPages && (
        <button
          className="p-8 self-center m-4 rounded-md bg-blue-400"
          onClick={() => setPageNumber((x) => x + 1)}
        >
          Load more!
        </button>
      )}
    </div>
  );
};

export default GridView;
