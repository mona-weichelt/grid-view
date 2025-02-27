import Image from "next/image";

export type GridItem = {
  title: string;
  description: string;
  imagePath: string;
};

type GridViewProps = {
  data: GridItem[];
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
    <button className="relative bg-white border shadow-lg rounded-lg flex flex-col overflow-clip hover:scale-105 duration-200 ease-in-out">
      <Image
        className="lg:max-w-64 object-scale-down"
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
    </button>
  );
};

const GridView = ({ data, children, className }: GridViewProps) => {
  return (
    <div className={"flex flex-col " + className}>
      {children}
      <div className="gap-4 space-y-4 h-fit columns-2 md:columns-3 xl:columns-4">
        {data.map((item) => {
          return <GridItem key={item.imagePath} {...item} />;
        })}
      </div>
    </div>
  );
};

export default GridView;
