import { IProduct } from '@/interfaces'
import React from 'react'
import Heading from '../global/Heading'

export interface IProps {
    product: IProduct
}
const RatingList = ({product}: IProps) => {
  return (
    <div>
        <Heading title='Reviews'/>
    </div>
  )
}

export default RatingList