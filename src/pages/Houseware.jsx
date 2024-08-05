import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import PostCard from '../Components/PostCard';
import Addpost from '../Components/Addpost';
import Cookies from 'js-cookie';
import axios from 'axios';
import ResultList from '../Components/ResultList'

function Houseware() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [results,setResults] = useState([])
  const cookies = Cookies.get('token');

  
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
    <div className='bg-slate-50 text-center h-screen'>
      <Navbar />
      <Drawer setResults={setResults} />
      <ResultList results={results}/>
      <Addpost  onPostAdded={handlePostAdded} />

      <div className="text-center sm:ml-64 sm:mt-10">
        <h1 >Houseware</h1>
        <div className='grid grid-cols-2 ml-2  mt-3 sm:ml-0 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {posts.map((post, index ) => (
            <PostCard key={index} post={post} />
          ))} 
        </div>
        {/* <AddPost setPosts={setPosts} /> */}
      </div>
    </div>
  );
}

export default Houseware;