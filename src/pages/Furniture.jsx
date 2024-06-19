import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'

function Furniture() {
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-amber-500 sm:ml-64 sm:mt-10 ">
        <h1>Furniture</h1>
      </div>
    </div>
  )
}

export default Furniture
