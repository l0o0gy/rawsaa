import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import PostCard from '../Components/PostCard';
import { PostContext } from '../Components/contacts/store';
import PropTypes from 'prop-types';

function Houseware({  }) {
  const { posts } = useContext(PostContext);
  const navigate = useNavigate();
  const [sectionPosts, setSectionPosts] = useState([]);


  return (
    <div className='bg-white text-center h-screen'>
      <Navbar />
      <Drawer />
      <div className="text-center sm:ml-64 sm:mt-10">
        <h1 className="bg-amber-400">Houseware</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {sectionPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Houseware.propTypes = {
//   isAuthenticated: PropTypes.func.isRequired,
// };

export default Houseware;
