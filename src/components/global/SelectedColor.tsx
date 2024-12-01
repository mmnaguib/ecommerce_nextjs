"use client";
import { ImageType } from "@/interfaces";
import { useCallback, useEffect, useState } from "react";

interface SelectedImageProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageToState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectedColor = ({
  item,
  addImageToState,
  removeImageToState,
  isProductCreated,
}: SelectedImageProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);

  const handleClick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);
    if (!e.target.checked) {
      setFile(null);
      removeImageToState(item);
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          type="checkbox"
          id={item.color}
          checked={isSelected}
          onChange={handleClick}
          className="pointer-cursor"
        />
        <label className="font-medium cursor-pointer" htmlFor={item.color}>
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && <div className="col-span-2 text-center"></div>}
      </>
    </div>
  );
};

export default SelectedColor;
