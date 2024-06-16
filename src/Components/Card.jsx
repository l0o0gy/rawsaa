import React from "react"
function Card({item}) {
  return (
    <div className=" mb-5 ml-2 card  flex sm:mb-10 sm:ml-0 ">
      <div className=" border-2 rounded-md flex mt-2 ">
      <div>
      <img src={item.img} alt={item.title} className="w-60   rounded-md pb-3"/>
      <h3 className="text-lg font-semibold shadow-md">{item.title}</h3>
      </div>
      </div>
    </div>
  )
}

export default Card;

