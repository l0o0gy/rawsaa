import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPost from '../Components/Addpost';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import PostCard from '../Components/PostCard';

function Electronics() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`https://mena.alraed1.com/posts`).then((res) => {
      setPosts(res.data);
      console.log(typeof setPosts);
      console.log(res.data[0]);

    });
  }, []);

  return (
    <div className='bg-white text-center h-screen'>
      <Navbar />
      <Drawer />
      <div className=" text-center bg-amber-800 sm:ml-64 sm:mt-10 ">
        <h1>Electronics</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        <AddPost setPosts={setPosts} />

      </div>
    </div>
  );
}

export default Electronics;
