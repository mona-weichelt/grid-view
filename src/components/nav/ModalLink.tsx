import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

const ModalLink = () => {
  return (
    <Link
      scroll={false}
      href="/?show=true"
      className="sticky bottom-4 right-4 self-end mb-4 h-16 w-16 rounded-full bg-pink-500 flex justify-center items-center border-2 border-pink-500 hover:border-blue-500"
    >
      <FaPlus color="white" size={32} />
    </Link>
  );
};

export default ModalLink;
