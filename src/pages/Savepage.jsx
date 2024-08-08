import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import Cookies from 'js-cookie';
import PostCard from '../Components/PostCard';

function Savepage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [savedPosts, setSavedPosts] = useState([]);
  const [seachinput, setSearchInput] = React.useState('');


  useEffect(() => {
    const authStatus = Cookies.get('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      navigate('/Loginpage'); 
    } else {
      const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
      setSavedPosts(savedPosts);
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className=' text-center '>
      <div className="text-center  sm:ml-64 sm:mt-10 p-4 ">
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
  );
}

export default Savepage;
