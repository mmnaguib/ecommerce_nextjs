import { ICartItem, ImageProps } from '@/interfaces';
import React from 'react';

export interface SetQuantityProps {
    cartCounter?: boolean,
    cartProduct: ICartItem | null,
    handleIncrease: () => void;
    handleDecrease: () => void;
}

const SetQuantity = ({cartCounter, cartProduct, handleIncrease, handleDecrease}: SetQuantityProps) => {
  return (
    <div className='flex items-center gap-8'>
        {cartCounter ? null : <span className='text-semibold'>Qunatity: </span>}
        <div className='flex items-center gap-2'>
            <button disabled={Number(cartProduct?.quantity) >= Number(cartProduct?.stock) }  className='border-[1.2px] rounded px-2 border-slate-300' onClick={handleIncrease}>+</button>
            <div>{cartProduct?.quantity}</div>
            <button disabled={Number(cartProduct?.quantity) <= 1} className='border-[1.2px] rounded px-2 border-slate-300' onClick={handleDecrease}>-</button>
        </div>
    </div>
  );
};

export default SetQuantity;
