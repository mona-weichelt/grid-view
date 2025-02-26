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

//TODO: implement this
const getWidthFromSource = (src: string) => 800;

const GridItem = ({ title, description, imagePath }: GridItem) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <Image
        alt={title}
        src={imagePath}
        width={getWidthFromSource(imagePath)}
        height={800}
      />
    </div>
  );
};

const GridView = ({
  data,
  firstPageSize = 10,
  pageSize = 10,
}: GridViewProps) => {
  const [pageNumber, setPageNumber] = useState(0);
  const overflow = Math.max(data.length - firstPageSize, 0);
  const numberOfPages = Math.ceil(overflow / pageSize);

  const visibleData = data.slice(0, firstPageSize + pageNumber * pageSize);

  return (
    <div className="flex flex-col">
      {visibleData.map((item) => {
        return <GridItem key={item.imagePath} {...item} />;
      })}
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
