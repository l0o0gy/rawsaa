import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'

function Books() {
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-pink-300 sm:ml-64 sm:mt-10 ">
        <h1>Books</h1>
    </div>
    </div>
  )
}

export default Books
