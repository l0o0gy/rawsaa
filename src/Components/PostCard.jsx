import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import PropTypes from 'prop-types';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';

const PostCard = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    return savedPosts.some(savedPost => savedPost.id === post.id);
  });

  if (!post) {
    return null; 
  }

  const handleBookmarkClick = () => {
    let savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    
    if (!isBookmarked) {
      savedPosts = [...savedPosts, post];
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      setIsBookmarked(true);
    } else {
      savedPosts = savedPosts.filter(savedPost => savedPost.id !== post.id);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
      setIsBookmarked(false);
    }
  };
  return (
    <div>
      {post && (
        <Card sx={{ height: '100%' }}>            
          <Stack direction="row" spacing={0} 
            sx={{
              // marginLeft: '10px',
              marginTop: '10px',
              fontSize: '10px',
               display: 'flex',
                justifyContent:'space-between',
                height:70,
               }}
                         >
            <Avatar
              src="https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg"
              alt="User Avatar"
              sx={{ marginLeft: '10px'}}
            />
            <CardHeader
              sx={{
                fontSize: '10px',
                marginTop:'-10px',
                // display: 'flex',
                // justifyContent:'space-evenly'
               }}

              title={post.user_name}
              subheader={post.date}

           />  
            <IconButton onClick={handleBookmarkClick}>
              {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
            </IconButton>
          </Stack>
          <CardMedia
            sx={{ marginTop: '-13px' }}
            component="img"
            height="90"
            image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
            alt={post.item_name}
          />
          <CardContent sx={{ marginTop: '-13px' }}>
            <Typography variant="body2" color="text.secondary">
              {post.item_name}
            </Typography>
          </CardContent>
            <Link to={`/posts/${post.id}`} state={{ post }} style={{ textDecoration: 'none' }}>
              <button  className='mb-2 p-2 bg-orange-500  text-white rounded w-11/12'>
               Read More
              </button>
            </Link>
        </Card>
      )}
    </div>
  );
};

export default PostCard;
