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

  return (
    <div className={"space-x-2 flex flex-row " + className}>
      {[...Array(pageCount)].map((_item, index) => {
        const isSelected = index === currentPage;
        return (
          <button
            key={index}
            className="w-12 h-12 border-2 border-pink-400 rounded-lg text-xl"
            onClick={() => onPress(index)}
            style={{
              backgroundColor: isSelected ? "#f472b6" : "#FFFFFF",
              color: isSelected ? "#FFFFFF" : "#000000",
              fontWeight: isSelected ? "bold" : "normal",
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default PageNavigator;
