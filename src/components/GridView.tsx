import Image from "next/image";

export type GridItem = {
  title: string;
  description: string;
  imagePath: string;
  id: string;
};

type GridViewProps = {
  data: GridItem[];
  className?: string;
};

const GridItem = ({ title, description, imagePath }: GridItem) => {
  return (
    <div className="flex flex-col hover:scale-105 duration-200 ease-in-out break-inside-avoid-column bg-white dark:bg-gray-700 shadow-lg">
      <h1 className="p-2 font-bold md:text-2xl text-left">{title}</h1>
      <Image
        className="lg:max-w-64 object-scale-down"
        alt={title}
        src={imagePath}
        width={800}
        height={800}
      />
      <p className="p-2">{description}</p>
    </div>
  );
};

const GridView = ({ data, className }: GridViewProps) => {
  return (
    <div className={"flex flex-col " + className}>
      <div className="gap-4 space-y-4 h-fit columns-2 md:columns-3 xl:columns-4">
        {data.map((item) => {
          return <GridItem key={item.id} {...item} />;
        })}
      </div>
    </div>
  );
};

export default GridView;
