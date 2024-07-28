import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import PostCard from '../Components/PostCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Addpost from '../Components/Addpost';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


function ElectricalDevices() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const cookies = Cookies.get('token');


  useEffect(() => {
    axios.get(`https://mena.alraed1.com/postsCategory/Electrical Devices/0/10`)
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
          console.log('User authenticated');
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage');
      }
    };
    fetchData();
  }, [cookies, navigate]);

   
const handlePostAdded=()=>{
  axios.get(`https://mena.alraed1.com/postsCategory/Electrical Devices/0/10`)
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
    <div className='bg-slate-50 text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <Addpost  onPostAdded={handlePostAdded} />

      <div className=" text-center  sm:ml-64 sm:mt-10 ">
        <h1>ElectricalDevices</h1>
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

export default ElectricalDevices
