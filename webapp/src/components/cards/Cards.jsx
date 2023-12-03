import React from 'react'
import "./cards.css"

const Cards = ({value, src, title, size, alt}) => {
  return (
    <div className={'cards '+size}>
        <img src={src} alt={alt}/>
        <div className='card-content'>
            <span className='value font-bold'>{value}</span>
            <span className='sub-title text-sm'>{title}</span>
        </div>
    </div>
  )
}

export default Cards