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
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [showPost, setShowPost] = useState(true);

  if (!post) {
    return null; // or a placeholder like a loading spinner
  }

  return (
    <div>
      {showPost && (
        <Link to={`/posts/${post.id}`} state={{ post }} style={{ textDecoration: 'none' }}>
          <Card sx={{ height: 500 }}>
            <CardHeader
              sx={{ marginLeft: '-10px', marginTop: '-10px', fontSize: '10px' }}
              avatar={
                <img
                  style={{ maxWidth: 50, objectFit: 'cover', borderRadius: 100 }}
                  src={`https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg`}
                />
              }
              title={post.user_name}
              subheader={post.date}
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
                {post.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ marginTop: '-30px' }}>
              <Box sx={{ marginTop: '3px' }}>
                <div>
                  <Button
                    sx={{ bgcolor: orange[500], color: 'white', width: 140, height: 50 }}
                  >
                    Read More
                  </Button>
                </div>
              </Box>
            </CardActions>
          </Card>
        </Link>
      )}
    </div>
  );
};

export default PostCard;
