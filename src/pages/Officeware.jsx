import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import PostCard from '../Components/PostCard';
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import Addpost from '../Components/Addpost';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import ResponsiveDrawer from '../Components/Drawer.jsx';
import { useData } from "../Components/contacts/store";


function Officeware() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const cookies = Cookies.get('token');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const items = useData();

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsSearching(true);  
    axios
      .get(`https://mena.alraed1.com/postSearch/${term}`)
      .then((response) => {
        const filteredPosts = response.data.filter(post => post.category === 'Officeware');
        setPosts(filteredPosts);
        setIsSearching(false);  
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsSearching(false); 
      });
  };

  useEffect(() => {
    axios.get(`https://mena.alraed1.com/postsCategory/Officeware/0/10`)
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
  axios.get(`https://mena.alraed1.com/postsCategory/Officeware/0/10`)
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
    <div className='text-center h-screen'>
      <ResponsiveDrawer handleSearch={handleSearch} />
      <Addpost onPostAdded={handlePostAdded} />
      <div className='mt-16 sm:mt-0'>
        {searchTerm === '' ? (
          <div className="text-center sm:ml-60">
            <div className='grid grid-cols-2 ml-1 mt-3 sm:ml-0 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 sm:gap-4 gap-3 p-1 sm:mb-5'>
              {posts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center sm:ml-60">
            {isSearching ? (
              <p className="flex justify-center items-center h-80 text-center">Searching...</p>
            ) : posts.length > 0 ? (
              <div className='grid grid-cols-2 ml-1 mt-3 sm:ml-0 md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 sm:gap-4 gap-3 p-1 sm:mb-5'>
                {posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80 text-center ">
                <p>Item not found </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Officeware
