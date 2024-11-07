import { ICartItem, ImageProps, IProduct } from '@/interfaces';
import Image from 'next/image';
import React from 'react';

export interface setColorProps {
    product: IProduct,
    cartProduct: ICartItem | null,
    handleSetImage: (val: ImageProps) => void;
}

const ProductImages = ({ product, cartProduct,handleSetImage }: setColorProps) => {
  return (
    <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
        <div className='flex flex-col items-center justify-start gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
                {product.images.map((image: ImageProps) => (
                    <div key={image.color} onClick={()=>handleSetImage(image)}  className={`relative object-contain w-[80%] aspect-square rounded border-teal-300 ${cartProduct?.image.color === image.color ? 'border-[1.5px]' : 'border-none'} `}>
                        <Image fill src={image.image} alt='product image' />
                    </div>
                ))}
        </div>
        
        <div className='col-span-5 relative aspect-square'>
                <Image fill src={cartProduct?.image.image as string} alt='selected Image' className='w-full object-contain h-full max-w-[500px] max-h-[500px] min-h-[300px] sm:min-h-[400px]' />
            </div>
    </div>
  );
};

export default ProductImages;
