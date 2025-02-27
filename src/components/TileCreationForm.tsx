import Link from "next/link";
import { HTMLInputTypeAttribute, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { GridItem } from "./GridView";
import Image from "next/image";
import { resolve } from "path";

const FormInput = ({
  name,
  type,
}: {
  name: string;
  type?: HTMLInputTypeAttribute;
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
  const createTileData = (formData: FormData): Promise<GridItem> => {
    const image = formData.get("image") as File;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);

    return new Promise<GridItem>((resolve, reject) => {
      fileReader.onload = () => {
        const result = fileReader.result as string;
        const slicedResult = result.slice(result.indexOf(";base64,") + 8);
        resolve({
          title: formData.get("title")?.toString() ?? "",
          description: formData.get("description")?.toString() ?? "",
          imagePath: result,
        });
      };
      fileReader.onerror = () => reject("Failed to read image");
    });
  };

  return (
    <div
      className={
        "fixed self-center top-1/3 my-auto flex justify-center items-center " +
        className
      }
    >
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
        <FormInput name="title" />
        <FormInput name="description" />
        <FormInput name="image" type="file" />
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
