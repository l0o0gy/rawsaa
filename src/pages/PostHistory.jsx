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

export default function AddYours() {
  const navigate = useNavigate();
  const [history, setHistoryState] = useState([]);
  const [getuser_id, setGetuserId] = useState(0); // State for storing user_id
  const cookies = Cookies.get('token');

  useEffect(() => {
    // Function to fetch user ID
    const fetchUserId = async () => {
      try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
        console.log('Fetched user_id:', data.user_id);
        setGetuserId(data.user_id); // Update state with user_id
      } catch (error) {
        console.error('Error checking role:', error);
        // Navigate to login page or handle the error
        // navigate('/loginpage');
      }
    };

    // Fetch user ID and then fetch postsCategory
    fetchUserId();
  }, [cookies]);

  useEffect(() => {
    if (getuser_id === 0) return; // Do nothing if user_id is not yet set

    // Fetch postsCategory only if getuser_id is valid
    axios.get(`https://mena.alraed1.com/userPosts/${getuser_id}/0/20`)
      .then((res) => {
        console.log('Fetched posts:', res.data.result);
        setHistoryState(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getuser_id]);

  const handlePostAdded = () => {
    if (getuser_id === 0) return; // Do nothing if user_id is not yet set

    // Refresh postsCategory when a new post is added
    axios.get(`https://mena.alraed1.com/userPosts/${getuser_id}/0/20`)
      .then((res) => {
        setHistoryState(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Drawer />
      <Addpost  onPostAdded={handlePostAdded} />
      <div className=' mt-20 ml-3 mr-3 w-screen sm:ml-64 '>
        <div style={{ height: 570 }}>
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