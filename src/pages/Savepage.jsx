import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import Cookies from 'js-cookie';
import PostCard from '../Components/PostCard';
import ResponsiveDrawer from '../Components/Drawer'
import axios from 'axios';
import img from '../assets/img/no-saved-posts-found.png'

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
        setIsAuthenticated(true); 
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage');
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
    <div>
      <ResponsiveDrawer />
      <div className=' text-center '>
        <div className="text-center mt-14 sm:ml-60 sm:mt-10 p-4 ">
          <div className='  grid grid-cols-2  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '
          // style={{ 
          //   display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4, width: '100%' 
          //   }}
          >
            {savedPosts.length > 0 ? (
              savedPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
              <div className='justify-center mt-24 w-96 sm:ml-16 flex lg:mt-20 lg:ml-80 '>
              <img src={img} alt='logo not save found post' />
            </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}

export default Savepage;
