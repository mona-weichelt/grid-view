import Link from "next/link";
import { ChangeEventHandler, HTMLInputTypeAttribute, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";
import { GridItem } from "./GridView";

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
      <p className="mt-4 first-of-type:mt-0">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <input
        required
        type={type}
        accept={type === "file" ? "image/*" : undefined}
        name={name}
        onChange={onChange}
        className="p-2 border w-full rounded-lg hover:border-blue-400"
      />
    </>
  );
};

type TileCreationFormProps = {
  onSubmit: (tile: Promise<GridItem>) => void;
  [x: string]: any;
};

const TileCreationForm = ({ onSubmit, className }: TileCreationFormProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const createTileData = (formData: FormData): Promise<GridItem> => {
    const image = formData.get("image") as File;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    return new Promise<GridItem>((resolve, reject) => {
      fileReader.onload = () => {
        const result = fileReader.result as string;
        resolve({
          title: formData.get("title")?.toString() ?? "",
          description: formData.get("description")?.toString() ?? "",
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

  return (
    <div className={"flex justify-center items-center " + className}>
      <form
        action={(formData) => {
          onSubmit(createTileData(formData));
        }}
        className="bg-white p-4 rounded-lg flex flex-col"
      >
        <div className="flex flex-row justify-between items-center gap-16 mb-8">
          <h1 className="text-2xl">Create your own tile!</h1>
          <Link scroll={false} href="/">
            <IoMdClose size={32} />
          </Link>
        </div>
        <FormInput name="title" onChange={() => setIsSuccess(null)} />
        <FormInput name="description" onChange={() => setIsSuccess(null)} />
        <FormInput
          name="image"
          type="file"
          onChange={() => setIsSuccess(null)}
        />
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
    </div>
  );
};

export default TileCreationForm;
