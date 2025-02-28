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

export default NoResultScreen;
