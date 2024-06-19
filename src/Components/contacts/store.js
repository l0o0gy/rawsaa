import React from "react";
import img1 from '../../assets/img/houseware.jpg'
import img2 from '../../assets/img/Officeware.jpg'
import img3 from '../../assets/img/Electronics.jpg'
import img4 from '../../assets/img/Furniture.jpg'
import img5 from '../../assets/img/Car Accessories.png'
import img6 from '../../assets/img/books.jpg'
import img7 from '../../assets/img/Antiques.jpg'
import img8 from '../../assets/img/Electrical devices.jpg'

import { createContext, useContext, useState} from 'react';

const DataContext = createContext();

const data = [
    { id: 1, img: img1, title: "Houseware" },
    { id: 2, img: img2, title: "Office Ware" },
    { id: 3, img: img3, title: "Electronics" },
    { id: 4, img: img4, title: "Furniture" },
    { id: 5, img: img5, title: "Car Accessories" },
    { id: 6, img: img6, title: "Books" },
    { id: 7, img: img7, title: "Antiques" },
    { id: 8, img: img8, title: "Electrical Devices" }
];

export const DataProvider = ({ children }) => {
    const [items] = useState(data);

    return (
        <DataContext.Provider value={items}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};
