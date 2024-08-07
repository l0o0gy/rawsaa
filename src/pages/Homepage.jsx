import React, { useState } from 'react';
import Card from '../Components/Card';
import { useData } from "../Components/contacts/store";
import Coversection from '../Components/Coversection';
import Addpost from "../Components/Addpost";
import ResponsiveDrawer from '../Components/Drawer.jsx';
import PostCard from '../Components/PostCard';

import axios from 'axios'
function Homepage({ isAuthenticated }) {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const items = useData();

  const handleSearch = (term) => {
    setSearchTerm(term); 
      axios
        .get(`https://mena.alraed1.com/postSearch/${searchTerm}`)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });

  };

  return (
    <div className=' text-center h-screen  bg-white'>
      <ResponsiveDrawer handleSearch={handleSearch} />
      {searchTerm === '' ? (
        <>
          <Addpost />
          <Coversection  />
          <div className="mr-2 grid grid-cols-2 sm:grid-cols-4 sm:ml-64 sm:mt-10">
            {items.map(item => (
              <Card key={item.id} item={item} isAuthenticated={isAuthenticated} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center sm:ml-64 sm:mt-10">
          <div className='grid grid-cols-2 ml-2 sm:ml-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
        {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;