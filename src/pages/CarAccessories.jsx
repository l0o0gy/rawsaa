import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'

function CarAccessories() {
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-gray-400 sm:ml-64 sm:mt-10 ">
        <h1>CarAccessories</h1>
    </div>
    </div>
  )
}

export default CarAccessories
