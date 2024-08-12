import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import Cookies from 'js-cookie';
import PostCard from '../Components/PostCard';
import ResponsiveDrawer from '../Components/Drawer'
import axios from 'axios';

function Savepage() {
  const navigate = useNavigate();
  const cookies = Cookies.get('token');  
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [savedPosts, setSavedPosts] = useState([]);
  const [seachinput, setSearchInput] = React.useState('');

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
        setIsAuthenticated(true); // Set to true if authenticated
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage'); // Redirect to login if not authenticated
      }
    };

    fetchData();
  }, [cookies, navigate]);

  useEffect(() => {
    if (isAuthenticated) {


    
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
      setSavedPosts(savedPosts);
  }
  }, [isAuthenticated]);

  return (
    <>
    <ResponsiveDrawer/>
    <div className=' text-center '>
      <div className="text-center  sm:ml-60 sm:mt-10 p-4 ">
        <div  className='  grid grid-cols-2  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '
        // style={{ 
        //   display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4, width: '100%' 
        //   }}
          >
          {savedPosts.length > 0 ? (
            savedPosts.map(post => <PostCard key={post.id} post={post} />)
          ) : (
            <p>No saved posts found.</p>
          )}
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Savepage;
