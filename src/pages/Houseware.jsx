import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import PostCard from '../Components/PostCard';
import Addpost from '../Components/Addpost';
import Cookies from 'js-cookie';
import axios from 'axios';
import ResultList from '../Components/ResultList'
import Divider from '@mui/material/Divider';
import ResponsiveDrawer from '../Components/Drawer.jsx';
import { useData } from "../Components/contacts/store";

function Houseware() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [results,setResults] = useState([])
  const cookies = Cookies.get('token');
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

  
  useEffect(() => {
    axios.get(`https://mena.alraed1.com/postsCategory/Houseware/0/10`)
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
  axios.get(`https://mena.alraed1.com/postsCategory/Houseware/0/10`)
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
      {/* <Navbar /> */}
      <ResponsiveDrawer handleSearch={handleSearch} />
      {/* <Drawer setResults={setResults} /> */}
      {/* <ResultList results={results}/> */}
      <Addpost  onPostAdded={handlePostAdded} />
      {searchTerm === ''? (
        <>
        <div className="text-center sm:ml-60 ">
          <div className='grid grid-cols-2 ml-1  mt-3 sm:ml-0 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-3  p-1 sm:mb-5'>
            {posts.map((post, index ) => (
              <PostCard key={index} post={post} />
            ))} 
          </div>
        </div>
        </>
      ):(
        <div className="text-center sm:ml-60 ">
        <div className='grid grid-cols-2 ml-1  mt-3 sm:ml-0 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-3  p-1 sm:mb-5'>
          {items.map((post, index ) => (
            <PostCard key={index} post={post} />
          ))} 
        </div>
      </div>
      )}

    </div>
  );
}

export default Houseware;