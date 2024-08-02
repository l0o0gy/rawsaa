import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import Addpost from '../Components/Addpost';
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import PostCard from '../Components/PostCard';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';


import { useContext } from 'react';
import { PostContext } from '../Components/contacts/store';

function Antiques() {
  const [posts, setPosts] = useState([]);
  const cookies = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://mena.alraed1.com/postsCategory/Antiques/0/10`)
      .then((res) => {
        setPosts(res.data.result);
        console.log(typeof setPosts);
        console.log(res.data[0]);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
          console.log(data);
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage');
      }
    };
    fetchData();
  }, [cookies, navigate]);
  const handlePostAdded=()=>{
    axios.get(`https://mena.alraed1.com/postsCategory/Antiques/0/10`)
    .then((res) => {
      setPosts(res.data.result);
      console.log(typeof setPosts);
      console.log(res.data[0]);
    })
    .catch((error) => {
      console.error('Error fetching posts:', error);
    });
  }

  return (
    <div className=' text-center h-screen bg-slate-50'>
      {/* <Navbar/> */}
      {/* <Drawer/> */}
      <Addpost  onPostAdded={handlePostAdded} />

      {/* <input type='text' placeholder='search...' className=' w-60 sm:w-80 sm:ml-5 border h-10 mt-5  rounded-md p-2  ' /> */}
          {/* <button type='submit' className='mt-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-md text-white drop-shadow-md ml-1 sm:w-10 z-0'><SearchIcon/></button> */}
      <div className=" text-center sm:ml-64 sm:mt-10 ">
        <h1>Antiques</h1>
        <div className='grid grid-cols-2 ml-2 sm:ml-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
         {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        {/* <AddPost setPosts={setPosts} /> */}
    </div>
    </div>
  )
}

export default Antiques
