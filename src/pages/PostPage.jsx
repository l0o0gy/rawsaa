import React from 'react';
import { useLocation } from 'react-router-dom';

const PostPage = () => {
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <div>Loading...</div>;
  }

  const sendWhatsAppMessage = () => {
    const link = `https://api.whatsapp.com/send?phone=+964${post.user_number}&text=Check%20this%20out:%20${post.item_name}`;
    window.open(link, '_blank');
  };

  return (
    <div className=' ml-16 sm:ml-64 sm:grid grid-cols-2 sm:border-2 mt-3 w-3/4 overflow-hidden'>
      <div className='max-w-md max-h-min'>
        <img 
          className='max-w-full max-h-full'
          src={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`} 
          alt={post.item_name}
        />
      </div>
      <div>
        <h1>{post.item_name}</h1>
        <h2>{post.description}</h2>
        <h3>Posted by: {post.user_name}</h3>
        <h3>Date: {post.date}</h3>
        <button onClick={sendWhatsAppMessage} className='mt-4 p-2 bg-orange-300 hover:bg-orange-500  text-white rounded w-full'>
          Contact {post.user_name} in Watsapp 
        </button>
      </div>
    </div>
  );
};

export default PostPage;
