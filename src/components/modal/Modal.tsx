import Link from "next/link";
import { ReactNode } from "react";

const Modal = ({
  show,
  children,
  className,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`fixed z-40 w-full h-full flex justify-center items-center ${
        !show && "hidden"
      }`}
    >
      <Link
        tabIndex={-1}
        scroll={false}
        href="/"
        className="absolute w-full h-full bg-black bg-opacity-35"
      />
      <div
        className={
          "flex justify-center items-center animate-slide-in " + className
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
