import React from "react";
import img from '../img/img.jpg'
import { createContext, useContext, useState} from 'react';

const DataContext = createContext();

const data = [
    { id: 1, img: img, title: "Houseware" },
    { id: 2, img: img, title: "Office Ware" },
    { id: 3, img: img, title: "Electronics" },
    { id: 4, img: img, title: "Furniture" },
    { id: 5, img: img, title: "Car Accessories" },
    { id: 6, img: img, title: "Books" },
    { id: 7, img: img, title: "Antiques" },
    { id: 8, img: img, title: "Electrical Devices" }
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
