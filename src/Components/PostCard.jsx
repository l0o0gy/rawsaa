import React from 'react';

const PostCard = ({ post }) => {
  return (
    <div className='border p-4 m-2'>
      {post.photo && <img src={URL.createObjectURL(post.photo)} alt={post.itemName} className='w-60' />}
      <h3>{post.itemName}</h3>
      <p>{post.description}</p>
      <p>{post.location}</p>
      <div>
        {post.categories.map((category, index) => (
          <span key={index} className='badge'>{category.title}</span>
        ))}
      </div>
    </div>
  );
};

export default PostCard;