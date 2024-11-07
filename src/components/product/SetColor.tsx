import { ICartItem, ImageProps } from '@/interfaces';
import React from 'react';

export interface setColorProps {
    images: ImageProps[],
    cartProduct: ICartItem | null,
    handleSetColor: (val: ImageProps) => void;
}

const SetColor = ({ images, cartProduct, handleSetColor }: setColorProps) => {
  return (
    <div className='flex items-center gap-4'>
        <span className='text-semibold'>Color: </span>
        <div className='flex items-center gap-2'>
            {images.map(image => (
                <div 
                    key={image.color} 
                    onClick={() => handleSetColor(image)} 
                    className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct?.image.color === image.color ? "border-[1.5px]" : 'none'}`}
                >
                    <div 
                        style={{ background: image.colorCode }} 
                        className='h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer'
                    ></div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default SetColor;
