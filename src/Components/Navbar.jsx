import React from 'react'
import logo from './img/logo.png'
function Navbar() {
  return (
    <div className='flex justify-between pl-6 shadow-lg'>
        <div className='flex '>
            <img className='w-8 h-9 mt-3'
                 src={logo} alt='logo'/>
           <h1 className='pt-5 font-bold text-lg mr-80 '>awssa</h1>
        </div>
        <input className=' w-3/4 seacrch border-2 pl-10 p-1 mr-80 mt-5 mb-2 rounded-lg hover:bg-gray-50'
        type='text' placeholder='search...'/>
    </div>
  )
}

export default Navbar