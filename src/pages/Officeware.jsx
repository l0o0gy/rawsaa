import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'

function Officeware() {
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-amber-200 sm:ml-64 sm:mt-10 ">
        <h1>Officeware</h1>
    </div>
    </div>
  )
}

export default Officeware
