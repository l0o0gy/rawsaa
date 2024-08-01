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
    <div className='text-center h-screen'>
      {/* <Navbar /> */}
      <Drawer isAuthenticated={isAuthenticated} />
      <div className="text-center bg-red-100 sm:ml-64 sm:mt-10 p-4 flex-row">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, width:'100%',height:'100%' }}>
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
