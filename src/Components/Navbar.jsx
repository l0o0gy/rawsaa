import React from 'react'
import logo from './img/logo.png'
import instagramlogo from './img/instagram.png'
import lightmoodlogo from './img/sun.png'
// import darkmoodlogo from './img/moon.png'
import InstagramIcon from '@mui/icons-material/Instagram';
import line from './img/line.png'
function Navbar() {
  return (
    <div className='flex justify-between pl-6 shadow-lg'>
        <div className='flex '>
            <img className='w-8 h-9 mt-3'
                 src={logo} alt='logo'/>
           <h1 className='pt-5 font-bold text-lg mr-80 '>awssa</h1>
        </div>
        <input className=' w-96 seacrch border-2 pl-10 p-1 mr-80 mt-3 mb-1  rounded-lg hover:bg-gray-50'
        type='text' placeholder='search...'/>
        <div className='flex '>
          <img className='w-6 h-6 mt-3 mr-2' src={line}/>
          <img className='w-6 h-6 mt-3 mr-6' src={lightmoodlogo}/>
          <img  className='w-6 h-6 mt-3 mr-6' src={instagramlogo}/>
        </div>
    </div>

  )
}

export default Navbar