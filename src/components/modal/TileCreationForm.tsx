import Link from "next/link";
import {
  ChangeEventHandler,
  Dispatch,
  HTMLInputTypeAttribute,
  SetStateAction,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { GridItem } from "../GridView";

const FormInput = ({
  name,
  type,
  onChange,
}: {
  name: string;
  type?: HTMLInputTypeAttribute;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <>
      <p className="mt-4 first-of-type:mt-0 capitalize">
        {name}
      </p>
      <input
        required
        type={type}
        accept={type === "file" ? "image/*" : undefined}
        name={name}
        onChange={onChange}
        className="p-2 border-2 w-full bg-transparent rounded-lg dark:hover:border-pink-400 hover:border-blue-400"
      />
    </>
  );
};

type TileCreationFormProps = {
  onSubmit: (tile: Promise<GridItem>) => void;
  className?: string;
};

export const createTileData = (
  file: File,
  title: string,
  description: string,
  setIsSuccess: Dispatch<SetStateAction<boolean | null>>
): Promise<GridItem> => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  return new Promise<GridItem>((resolve, reject) => {
    fileReader.onload = () => {
      const result = fileReader.result as string;
      resolve({
        title: title,
        description: description,
        imagePath: result,
        id: `custom-image-${Date.now()}`,
      });
      setIsSuccess(true);
    };
    fileReader.onerror = () => {
      reject("Failed to read image");
      setIsSuccess(false);
    };
  });
};

const TileCreationForm = ({ onSubmit, className }: TileCreationFormProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  return (
    <form
      action={(formData) => {
        const file = formData.get("image") as File;
        const title = formData.get("title")?.toString() ?? "";
        const description = formData.get("description")?.toString() ?? "";
        onSubmit(createTileData(file, title, description, setIsSuccess));
      }}
      className={"bg-white dark:bg-gray-700 p-4 rounded-lg flex flex-col " + className}
    >
      <div className="flex flex-row justify-between items-center gap-16 mb-8">
        <h1 className="text-2xl">Create your own tile!</h1>
        <Link scroll={false} href="/">
          <IoMdClose size={32} />
        </Link>
      </div>
      <FormInput name="title" onChange={() => setIsSuccess(null)} />
      <FormInput name="description" onChange={() => setIsSuccess(null)} />
      <FormInput name="image" type="file" onChange={() => setIsSuccess(null)} />
      {isSuccess === true && (
        <div className="mt-8 flex flex-row justify-center items-center gap-2">
          <h1 className="text-lg text-green-600">Success!</h1>
          <FaCheck size={18} color="green" />
        </div>
      )}
      {isSuccess === false && (
        <div className="mt-8 flex flex-row justify-center items-center gap-2">
          <h1 className="text-lg text-red-600">Failed to load the image</h1>
          <MdErrorOutline size={18} color="red" />
        </div>
      )}
      <button
        type="submit"
        className="bg-pink-500 w-fit p-2 px-4 mt-8 mb-4 rounded-lg text-white font-bold self-center"
      >
        Submit!
      </button>
    </form>
  );
};

export default TileCreationForm;
