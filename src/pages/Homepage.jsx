import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import Card from '../Components/Card'
import {useData} from "../Components/contacts/store"

function Homepage() {
  const items = useData();
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" mr-2 grid  grid-cols-2 sm:grid-cols-4 sm:ml-64 sm:mt-10 ">
      {items.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
    </div>
  )
}

export default Homepage;