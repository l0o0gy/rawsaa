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
          <CardHeader
            sx={{
              marginLeft: '-10px',
              marginTop: '-10px',
              fontSize: '10px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
            }}
            avatar={
              <img
                style={{ maxWidth: 50, objectFit: 'cover', borderRadius: 100 }}
                src={`https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg`}
                alt="User Avatar"
              />
            }
            title={post.user_name}
            subheader={post.date}
            action={
              <IconButton onClick={handleBookmarkClick}>
                {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
              </IconButton>
            }
          />
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
          <CardActions disableSpacing sx={{ marginTop: '-30px' }}>
            <Link to={`/posts/${post.id}`} state={{ post }} style={{ textDecoration: 'none' }}>
              <Box sx={{ marginTop: '3px' }}>
                <Button
                  sx={{ bgcolor: orange[500], color: 'white', width: 'full'}}
                >
                  Read More
                </Button>
              </Box>
            </Link>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default PostCard;
