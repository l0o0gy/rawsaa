import React from 'react'
import Navbar from '../Components/Navbar'
import Drawer from '../Components/Drawer'
import PostCard from '../Components/PostCard';
import { useContext } from 'react';
import { PostContext } from '../Components/contacts/store';

function Antiques() {
  const { posts } = useContext(PostContext);

  // const [showpost,setShowPost] = useState(true)

  // useEffect(()=>{
  //   window.localStorage.setItem("MY_POST",JSON.stringify(showpost))
  // },[showpost])


  const sectionPosts = posts.filter(post => 
    post.categories.some(category => category.title === "Antiques")
  );
  return (
    <div className='bg-white text-center h-screen'>
      <Navbar/>
      <Drawer/>
      <div className=" text-center bg-pink-300 sm:ml-64 sm:mt-10 ">
        <h1>Antiques</h1>
      {/* {showpost&&( */}

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
          {sectionPosts.map((post, index) => (
            <PostCard key={index} post={post}  />
          ))}
        </div>
      {/* )} */}
    </div>
    </div>
  )
}

export default Antiques
