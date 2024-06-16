import React from 'react'
import Navbar from './Navbar'
import Drawer from './Drawer'
import Card from './Card'
import {useData} from "./contacts/store"

function Homepage() {
  const items = useData();
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className="  mr-2 grid  grid-cols-2 sm:grid-cols-4 sm:ml-64 sm:mt-10 ">
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div></div>
  )
}

export default Homepage;