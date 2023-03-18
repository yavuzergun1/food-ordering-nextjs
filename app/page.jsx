import React from 'react'
import Campaigns from '../components/ui/Campaigns'
import Carousel from "../components/ui/Carousel"
import MenuWrapper from "../components/product/MenuWrapper"
import About from "../components/About"

const page = () => {
  return (
    <div className='font-dancing text-primary' >
      <Carousel />
      <Campaigns />
      <MenuWrapper />
      <About/>
    </div>
  )
}

export default page