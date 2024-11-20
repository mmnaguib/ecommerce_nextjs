import React from "react";
interface BackDropProps {
  onClick: () => void;
}
const BackDrop = ({ onClick }: BackDropProps) => {
  return (
    <div
      className="bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0"
      onClick={onClick}
    ></div>
  );
};

export default BackDrop;
