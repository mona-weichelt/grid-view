import Link from "next/link";
import { ReactNode } from "react";

const Modal = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className="fixed z-40 w-full h-full flex justify-center items-center">
      <Link
        scroll={false}
        href="/"
        className="absolute w-full h-full bg-black bg-opacity-35"
      />
      <div className={"flex justify-center items-center " + className}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
