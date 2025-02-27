import { MdMoreHoriz } from "react-icons/md";

type PageNavigatorProps = {
  pageCount: number;
  currentPage: number;
  onPress: (page: number) => void;
  [x: string]: any;
};

const PageNavigator = ({
  pageCount,
  currentPage,
  onPress,
  className,
}: PageNavigatorProps) => {
  if (pageCount < 2) return null;

  const indicesToRender = new Set<number>([
    0,
    pageCount - 1,
    currentPage,
    Math.max(currentPage - 1, 0),
    Math.min(currentPage + 1, pageCount - 1),
  ]);

  return (
    <div className={"space-x-2 flex flex-row items-center " + className}>
      {[...Array.from(indicesToRender)]
        .sort((a, b) => a - b)
        .map((value, index, array) => {
          const isSelected = value === currentPage;
          const shouldRenderDots =
            value > 1 && Math.abs(array[index - 1] - value) > 1;
          return (
            <>
              {shouldRenderDots && <MdMoreHoriz size={24} />}
              <button
                key={value}
                className="w-12 h-12 border-2 border-pink-400 rounded-lg text-xl"
                onClick={() => onPress(value)}
                style={{
                  backgroundColor: isSelected ? "#f472b6" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#000000",
                  fontWeight: isSelected ? "bold" : "normal",
                }}
              >
                {value + 1}
              </button>
            </>
          );
        })}
    </div>
  );
};

export default PageNavigator;
