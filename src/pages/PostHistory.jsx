import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '../Components/Drawer';
import Addpost from '../Components/Addpost';
import Cookies from 'js-cookie';
import axios from 'axios';



const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'item_name', headerName: 'Item Name', width: 90 },
  { field: 'description', headerName: 'Description', width: 250 },
  { field: 'category', headerName: 'Category', width: 130 },
  { field: 'date', headerName: 'Date', width: 130 },
  { field: 'time', headerName: 'Time', width: 130 },
  { field: 'edit', headerName: 'Edit', width: 90 },
  { field: 'delete', headerName: 'Delete', width: 90 },
];

// const rows = [
//   { id: '', itemName: '', description: ' ', category: '', date: '', time: '' },
// ];

export default function AddYours() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [history, setHistoryState] = useState([]);
  const cookies = Cookies.get('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
          console.log('User authenticated');
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage');
      }
    };
    fetchData();
  }, [cookies, navigate]);

  useEffect(() => {
    const historyData = () => {
      fetch(`https://mena.alraed1.com/posts`)
        .then((res) => res.json())
        .then((resData) => {
          console.log(resData);
          setHistoryState(resData);
        })
        .catch((err) => {
          console.error(err);
        });
    };
    historyData();
  }, []);

  if (isAuthenticated) {
    return null; // Render nothing or a loader while redirecting
  }

  return (
    <>
      <Drawer isAuthenticated={isAuthenticated} />
      <Addpost />
      <div className=' mt-20 ml-3 mr-3 w-screen sm:ml-64 '
      //  style={{ marginLeft: 250 ,textAlign:'center'}}
       >
        <div style={{ height: 570, 
          // width: '99%'
           }}>
          <DataGrid
            rows={history}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </>
  );
}
