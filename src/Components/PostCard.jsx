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
import { Box } from '@mui/material';
import UserInfoPost from './userInfoPost';


const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 150,
  objectFit: 'cover',
  height: 150,
  [theme.breakpoints.up('sm')]: {
    height: 250,
    width: 250,

  },
  [theme.breakpoints.up('md')]: {
    height: 250,
    width:345,
  },  
}));

const PostCard = ({ post }) => {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    return savedPosts.some(savedPost => savedPost.id === post.id);
  });


  if (!post) {
    return null;
  }


  return (
    <Card sx={{ maxWidth: {xs:345,sm:345}, height: {xs:320 ,sm:460} , border:'1px  solid gray' , borderRadius:"1px",fontsize:'10px'}}>
          <UserInfoPost userid={post.user_id} date={post.date} post={post} postId={post.id}/>
          <Box   style={{
          display:'flex',
          justifyContent:'center'
        }}>
      <StyledCardMedia
        component="img"
        image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
        alt={post.item_name}
        sx={{mt:{xs:'-10px',sm:0}}}
      />
      </Box>
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontSize:'20px',mt:{xs:'-10px',sm:0},mb:{xs:'-40px',sm:0},height:{xs:30,sm:30}, overflow:'hidden'}}>
          {post.item_name}
        </Typography>
      </CardContent>
        <CardContent>
          <Link to={`/posts/${post.id}`} state={{ post }} style={{ textDecoration: 'none'}}>
            <button className='mb-2 p-2 bg-orange-500 text-white rounded w-full'>
              Read More
            </button>
          </Link>
        </CardContent>
    </Card>
  );
};

export default PostCard;
