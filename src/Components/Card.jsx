import React from "react"
import { useNavigate } from 'react-router-dom';

function Card({item}) {
  const Houseware = useNavigate()
  const Officeware = useNavigate()
  const Electronics = useNavigate()
  const Furniture = useNavigate()
  const CarAccessories = useNavigate()
  const Books = useNavigate()
  const Antiques = useNavigate()
  const ElectricalDevices = useNavigate()

  
const handleCardClick = () => {
  switch(item.title){
    case 'Houseware':
     Houseware("/houseware");
     break;
     case 'Office Ware':
      Officeware("/officeware");
     break;
     case 'Electronics':
      Electronics("/electronics");
     break;
     case 'Furniture':
      Furniture("/furniture");
     break;
     case 'Car Accessories':
      CarAccessories("/carAccessories");
     break;
     case 'Books':
      Books("/books");
     break;
     case 'Antiques':
      Antiques("/antiques");
     break;
     case 'Electrical Devices':
      ElectricalDevices("/electricalDevices");
     break;
     default:
     break;
  }
};



  return (
    <div className="  mb-5 ml-2 flex sm:mb-10 sm:ml-0">
      <div className=" border-2 rounded-md flex mt-2 hover:bg-orange-200 " >
      <div onClick={handleCardClick}>
      <img src={item.img} alt={item.title} className=" w-60 h-40 rounded-md pb-3"/>
      <h3 className="text-lg font-semibold shadow-md" >{item.title}</h3>
      </div>
      </div>
    </div>
  )
}

export default Card;

