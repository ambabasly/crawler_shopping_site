import React from 'react'
import { Button, Tag } from 'antd'

const ChocolateItem = ({
  name,
  brand,
  cheapestShopLink,
  openDisplay
}: {
  name: string,
  brand: string,
  cheapestShopLink: string | null,
  openDisplay: () => void
}) => {
  return (
    <div className='chocolate-item'>
      <span className='listing'><b>Name: </b> {name}</span>
      <span className='listing'><b>Brand: </b> {brand}</span>
      <span className='listing'><b>Cheapest Shop Link: </b>  {
        cheapestShopLink === null ?
          <Tag>NO PRICES AVAILABLE</Tag>
          :
          <a href={cheapestShopLink} target="_blank" rel="noreferrer">Visit Link</a>
      }</span>
      <Button onClick={() => {
        openDisplay()
      }}>
        View Details
      </Button>
    </div>
  )
}

export default ChocolateItem