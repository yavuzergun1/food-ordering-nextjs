import React from 'react'
import Campaigns from '../components/ui/Campaigns'
import Carousel from "../components/ui/Carousel"
import MenuWrapper from "../components/product/MenuWrapper"

const page = () => {
  return (
    <div className='font-dancing text-primary ' >
      <Carousel />
      <Campaigns />
      <MenuWrapper />
    </div>
  )
}

export default page