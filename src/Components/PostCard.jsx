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
import { orange } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

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

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [showPost, setShowPost] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!post) {
    return null; // or a placeholder like a loading spinner
  }

  return (
    <div>
      {showPost && (
        <Card className='w-full h-60 sm:h-80'>
          <CardHeader
            sx={{ marginLeft: '-10px', marginTop: '-10px', fontSize: '10px' }}
            avatar={
              <Avatar 
                sx={{ bgcolor:orange[300], width: 30, height: 30 }}
                aria-label="recipe"
              >
                R
              </Avatar>
            }
               // action={
            //   <IconButton aria-label="settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={post.item_name}
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
              {/* {post.item_name} */}
              {post.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing sx={{ marginTop: '-30px' }}>
            {/* <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton> */}
            {/* <IconButton aria-label="share">
              <ShareIcon />
            </IconButton> */}
            <Box 
            sx={{ 
              // '& button': { m: 1 } ,
             marginTop:'3px'
             }}>
               <div >
              <Button  sx={{bgcolor:orange[500] ,color:'white', width:140,hight:50}}
              // className='bg-orange-500' 
              >
                Read More
              </Button>
              </div>
            </Box>
            {/* <Button 
              variant="contained" 
              sx={{ backgroundColor: 'orange', ml: 1 }}
              onClick={handleExpandClick}
            >
              Read More
            </Button> */}
            {/* <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore> */}
          </CardActions>

          {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Additional Information:</Typography>
              <Typography paragraph>
                Add any additional information or content here
              </Typography>
            </CardContent>
          </Collapse> */}

        </Card>
      )}
    </div>
  );
};

export default PostCard;
