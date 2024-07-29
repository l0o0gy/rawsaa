import React from 'react';
import { useLocation } from 'react-router-dom';


const PostPage = () => {
  const location = useLocation();
  const { post } = location.state;

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ml-64 grid grid-cols-2 border-2 mt-3 w-3/4 overflow-hidden'>
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
        
      </div>

    </div>
    // <Box sx={{marginLeft:'150px', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', 
    // // backgroundColor:'red'
    // }}>
    //   <Card sx={{ width: '90%', height: '100%',
    //     backgroundColor:'red',
 
    //     // borderRadius: 0,
    //      display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
    //     {/* <Grid container sx={{ height: '100%' }}> */}
    //       {/* <Grid item xs={18} md={6}
    //       //  sx={{backgroundColor:'gray'}}
    //        >  */}
    //         <CardMedia
    //           component="img"
    //           sx={{
    //             // border:1 ,
    //             // backgroundColor:'red',
    //             // marginTop:0,
    //             padding:5,
    //             margin:0,
    //             width: '40%',
    //             height: '100%',
    //             objectFit: 'cover',
    //           }}
    //           image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
    //           alt={post.item_name}
    //         />
    //       {/* </Grid> */}
    //       {/* <Grid item xs={4} md={4}> */}
    //         <CardContent sx={{ padding: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
    //           <Typography variant="h4" component="div" gutterBottom>
                
    //           </Typography>
    //           <Typography variant="body1" color="text.secondary" paragraph>
    //             {post.description}
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Posted by: {post.user_name}
    //           </Typography>
    //           <Typography variant="body2" color="text.secondary">
    //             Date: {post.date}
    //           </Typography>
    //         </CardContent>
    //       {/* </Grid> */}
    //     {/* </Grid> */}
    //   </Card>
    // </Box>
  );
};

export default PostPage;
