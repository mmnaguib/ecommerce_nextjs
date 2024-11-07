import React from 'react'

interface HeadingProps {
    title: string;
    center?: boolean
}
const Heading = ({title, center}: HeadingProps) => {
  return (
    <div className={center ? 'text-center' : 'text-stat'}>
        <h1 className='font-bold text-2xl'>{title}</h1>
    </div>
  )
}

export default Heading