import React from 'react'
import logo from '../assets/img/logo.png'
import instagramlogo from '../assets/img/instagram.png'
import lightmoodlogo from '../assets/img//sun.png'
import line from '../assets/img//line.png'
import { useNavigate } from "react-router-dom";


function Coverpage() {
    const navigate = useNavigate()

    const gotToNewPage=()=>{
      navigate("/homepage");
    }
  return (
    <div className=' Coverpage'>
        <div className='pl-2 flex justify-between  sm:pl-6 shadow pb-2'>
           <div className=' flex '>
            <img className=' sm:w-6 h-6 mt-3'
                 src={logo} alt='logo'/>
           <h1 className='pt-3 font-bold text-lg  sm:mr-80 '>awssa</h1>
           </div>
           <div className='flex '>
               <button className='mt-1 mr-0 pt-1 font-bold text-m  sm:mt-2' > Sign up </button>
               <img className=' mt-3 w-6 h-6 sm:mr-2' src={line} alt='line'/>
               <img className='mt-3 mr-2 w-6 h-6  sm:mr-6' src={lightmoodlogo} alt='light mood icon'/>
               <img  className='mt-3 mr-1 w-6 h-6 sm:mr-6' src={instagramlogo} alt='dark mood icon'/>
           </div>
        </div>
    <div className=' text-center'>
        <h1 className=' text-2xl mt-20 font-bold m-5 sm:text-5xl  sm:mt-40 ' >
            Rawssa with others and get what you need.</h1>
        <p className=' m-10  text-sm mt-0 sm:text-lg text-slate-400 sm:mt-5 sm:m-80 sm:mb-0'>
            The first Web App  in iraq to changing your old stuff that you don't need anymore with what you need it, faster than you think and without any cost </p>
        <button onClick={() => gotToNewPage()} 
            className='mt-0 bg-sky-500 hover:bg-sky-700 text-white pl-6 pr-6 p-2 rounded-md sm:mt-5'> 
            Get started 
        </button>
    </div>
    </div>
  )
}

export default Coverpage