import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import PostCard from '../Components/PostCard';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPost from '../Components/Addpost';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Addpost from '../Components/Addpost';




function Books() {
  const [posts, setPosts] = useState([]);
  const cookies = Cookies.get('token');
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`https://mena.alraed1.com/postsCategory/Books/0/10`)
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
  axios.get(`https://mena.alraed1.com/postsCategory/Books/0/10`)
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
    <div className=' text-center h-screen'>
      {/* <Navbar/> */}
      <Addpost  onPostAdded={handlePostAdded} />
      {/* <Drawer/> */}
      <div className="text-center sm:ml-60 ">
        <div className='grid grid-cols-2 ml-1  mt-3 sm:ml-0 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-3  p-1 sm:mb-5'>
          {posts.map((post, index ) => (
            <PostCard key={index} post={post} />
          ))} 
        </div>
      </div>
    </div>
  )
}

export default Books
