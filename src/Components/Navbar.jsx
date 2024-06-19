import React from 'react'
import logo from '../assets/img//logo.png'
import instagramlogo from '../assets/img//instagram.png'
import lightmoodlogo from '../assets/img//sun.png'
import line from '../assets/img/line.png'
function Navbar() {
  return (
    <div className='pl-2 flex justify-between  sm:pl-6 shadow pb-2'>
    <div className=' flex '>
     <img className='ml-10 sm:w-6 h-6 mt-3 sm:ml-0'
          src={logo} alt='logo'/>
    <h1 className='pt-3 font-bold text-lg  sm:mr-80 '>awssa</h1>
    </div>
    <div className='flex '>
        <img className=' mt-3 w-6 h-6 sm:mr-2' src={line} alt='line'/>
        <img className='mt-3 mr-3 w-6 h-6  sm:mr-6' src={lightmoodlogo} alt='light mood icon'/>
        <img  className='mt-3 mr-3 w-6 h-6 sm:mr-6' src={instagramlogo} alt='dark mood icon'/>
    </div>
 </div>

  )
}

export default Navbar