import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className=' w-40 border p-4 m-2'>
      {post.photo && <img src={URL.createObjectURL(post.photo)} alt={post.itemName} className='w-40 ' />}
      <h3>Name:{post.itemName}</h3>
      <p>Description: {post.description}</p>
      <p> location {post.location}</p>
      <button className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md mt-2 text-white drop-shadow-md w-full" >Read more </button>
      {/* <div>
        {post.categories.map((category, index) => (
          <span key={index} className='badge'>{category.title}</span>
        ))}
      </div> */}
    </div>
  );
};

export default PostCard;