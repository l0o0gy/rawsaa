import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red, orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  objectFit: 'cover',
  height: 200, 
  [theme.breakpoints.up('sm')]: {
    height: 400, 
  },
}));

const PostCard = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    return savedPosts.some(savedPost => savedPost.id === post.id);
  });

  const [expanded, setExpanded] = useState(false);

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: {sm:345} }}>
      <CardHeader
        avatar={
          <Avatar src="https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg" alt="User Avatar" />
        }
        action={
          <IconButton onClick={handleBookmarkClick} aria-label="bookmark">
          {isBookmarked ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
          </IconButton>
        }
        title={post.user_name}
        subheader={post.date}
      />
      <StyledCardMedia
        component="img"
        image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
        alt={post.item_name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.item_name}
        </Typography>
      </CardContent>
        <CardContent>
          <Link to={`/posts/${post.id}`} state={{ post }} style={{ textDecoration: 'none' }}>
            <button className='mb-2 p-2 bg-orange-500 text-white rounded w-full'>
              Read More
            </button>
          </Link>
        </CardContent>
    </Card>
  );
};

export default PostCard;
