import React from 'react'
import logo from './img/logo.png'
import instagramlogo from './img/instagram.png'
import lightmoodlogo from './img/sun.png'
// import darkmoodlogo from './img/moon.png'
import line from './img/line.png'
import { useNavigate } from "react-router-dom";


function Coverpage() {
    const navigate = useNavigate()

    const gotToNewPage=()=>{
      navigate("/homepage");
    }
  return (
    <div >
        <div className='flex justify-between pl-6 shadow pb-2'>
           <div className='flex '>
            <img className='w-6 h-6 mt-3'
                 src={logo} alt='logo'/>
           <h1 className='pt-3 font-bold text-lg mr-80 '>awssa</h1>
           </div>
           <div className='flex '>
               <button className='pt-1 font-bold text-m mr-2' > Sign up </button>
               <img className='w-6 h-6 mt-3 mr-2' src={line}/>
               <img className='w-6 h-6 mt-3 mr-6' src={lightmoodlogo}/>
               <img  className='w-6 h-6 mt-3 mr-6' src={instagramlogo}/>
           </div>
        </div>
    <div className='text-center'>
        <h1 className='text-5xl font-bold mt-40 ' >
            Rawssa with others and get what you need.</h1>
        <p className='text-lg text-slate-400 mt-5 m-80 mb-0'>
            The first Web App  in iraq to changing your old stuff that you don't need anymore with what you need it, faster than you think and without any cost </p>
        <button onClick={() => gotToNewPage()} 
            className='bg-sky-500 hover:bg-sky-700 text-white pl-6 pr-6 p-2 rounded-md mt-5'> 
            Get started 
        </button>
    </div>
    </div>
  )
}

export default Coverpage