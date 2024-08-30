import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Button } from '@mui/joy';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import img from '../assets/img/rawsshaa.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: '100%',
  objectFit: 'cover',
  height: 300,
  [theme.breakpoints.up('sm')]: {
    height: 600,
  },
  [theme.breakpoints.up('md')]: {
    height: 600,
  },
  [theme.breakpoints.up('lg')]: {
    height: 600,
    width: '100%',
  },
}));

const PostPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { post } = location.state || {};

  if (!post) {
    return <div>Loading...</div>;
  }

  const sendWhatsAppMessage = () => {
    const link = `https://api.whatsapp.com/send?phone=+964${post.user_number}&text=I'm%20interested%20in%20your%20post%20${post.item_name}`;
    window.open(link, '_blank');
  };


  const handleBackButton = () => {
    navigate(-1);
  };

  return (
    <>
      <Box sx={{ boxShadow: 1, mt: 0, display: 'flex', justifyContent: 'space-between' }}>
        <img src={img} alt='logo' className='w-40 ml-2 mt-2' />
        <IconButton
          color="default"
          aria-label="back"
          edge="start"
          onClick={handleBackButton}
          sx={{ mr: { xs: 2, sm: 'auto' }, mt: 0 }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box className='ml-4 mt-1 sm:mt-4 overflow-hidden'>
        <Card
          sx={{
            marginTop: { xs: 2, sm: 0 },
            width: { xs: '95%', sm: 'auto' },
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(1, 1fr)',
              lg: 'repeat(2, 1fr)',
            },
            gap: 1,
            marginLeft: { xs: 0, sm: 1 },
            marginRight: { xs: 0, sm: 1 },
          }}
        >
          <StyledCardMedia
            component="img"
            image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
            alt={post.item_name}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundColor: '#f6f6f6',
              pt: 5,
            }}
          >
            <CardContent sx={{ flex: '1 0 auto', p: { xs: 1, sm: 2 }, width: { xs: 350 ,sm:'auto' }, overflow: 'hidden' }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <h1 className='text-xl text-slate-600'>Item Name:</h1>
                      </TableCell>
                      <TableCell>
                        <Typography component="div" sx={{ fontSize: { xs: 17, sm: 22 } }}>
                          {post.item_name}
                        </Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <h1 className='text-xl text-slate-600'>Description:</h1>
                      </TableCell>
                      <TableCell>
                        <Typography component="div" sx={{ fontSize: { xs: 17, sm: 22 } }}>
                          {post.description}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>

            <Box sx={{ p: 2 }}>
              <CardContent sx={{ flex: '1 0 auto', p: { xs: 1, sm: 0 }, width: { xs: 350,sm:'auto' }, overflow: 'hidden', ml: { xs: '-15px', sm: 'auto' } }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <h1 className='text-xl text-slate-600'>Post by:</h1>
                        </TableCell>
                        <TableCell>
                          <Typography component="div" sx={{ fontSize: { xs: 17, sm: 22 } }}>
                            {post.first_name + ' ' + post.last_name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <h1 className='text-xl text-slate-600'>Date of post:</h1>
                        </TableCell>
                        <TableCell>
                          <Typography component="div" sx={{ fontSize: { xs: 17, sm: 22 } }}>
                            {post.date}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Box>

            <Stack sx={{ mb: 2, mt: 3, p: 2 }}>
              <Button
                sx={{
                  width: { xs: '100%', sm: '100%' },
                  backgroundColor: '#fb8f36',
                  '&:hover': {
                    backgroundColor: '#fa7305',
                  },
                  boxShadow: 5,
                  ml: { xs: '-5px', sm: 'auto' },
                }}
                onClick={sendWhatsAppMessage}
              >
                Contact {post.first_name + ' ' + post.last_name} on WhatsApp
              </Button>
            </Stack>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default PostPage;
