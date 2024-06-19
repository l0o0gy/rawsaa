import React from 'react'
import Navbar from './Navbar'
import Drawer from './Drawer'

function Savepage() {
  return (
    <div className=' text-center h-screen'>
    <Navbar/>
    <Drawer/>
    <div className=" text-center bg-red-500 sm:ml-64 sm:mt-10 ">
        <h1>savepage</h1>
    </div>
    </div>
  )
}
export default Savepage;
