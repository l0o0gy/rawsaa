import React from 'react'
import img from '../assets/img/rawssha.png'
import SearchIcon from '@mui/icons-material/Search';

function Coversection() {
  return (
    <div className=' mb-3 sm:mb-0 sm:ml-0 '>
      <div className=' grid grid-cols-2'>
        <div className='  w-80 text-start pl-4 sm:ml-60 sm:w-3/4 '>
          <h1 className='mt-20 text-xl font-bold ml-0 sm:text-4xl sm:ml-5  ' >
            Rawssha with others and </h1>
            <h1 className=' text-xl font-bold  sm:text-4xl sm:ml-5 sm:mt-2 text-orange-500 '>get what you need.</h1>
          <p className='  mr-40 text-xs mt-2 sm:text-sm sm:mt-5 sm:ml-5 sm:w-96 '>
            The first Web App  in iraq to changing your old stuff that you don't need anymore with what you need it, faster than you think and without any cost </p>
          <input type='text' placeholder='search...' className=' w-60 sm:w-80 sm:ml-5 border h-10 mt-5  rounded-md p-2 ' />
          <button type='submit' className='mt-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-md text-white drop-shadow-md ml-1 sm:w-10 z-0'><SearchIcon/></button>
        </div>
        <div>
          <img src={img} alt=" coverimg" className=' mt-20 mr-0 ml-0 sm:w-3/4 sm:mt-0 sm:ml-20 sm:pl-20 sm:pt-10'/>
        </div>
      </div>
    </div>
  )
}

export default Coversection
