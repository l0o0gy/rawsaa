import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'

function Electronics() {
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-amber-800 sm:ml-64 sm:mt-10 ">
        <h1>Electronics</h1>
    </div>    
    </div>
  )
}

export default Electronics
