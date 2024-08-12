import React from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import { Button } from '@mui/joy';
import { styled } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';


const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  width: 500,
  objectFit: 'cover',
  height: 300,
  [theme.breakpoints.up('sm')]: {
    height: 600,
    width: 600,
  },
  [theme.breakpoints.up('md')]: {
    height: 600,
    width: 600,
  },
  [theme.breakpoints.up('lg')]: {
    height: 600,
    width: 700,
  },

}));

const PostPage = () => {
  const location = useLocation();
  const { post } = location.state || {};

  if (!post) {
    return <div>Loading...</div>;
  }

  const sendWhatsAppMessage = () => {
    const link = `https://api.whatsapp.com/send?phone=+964${post.user_number}&text=Check%20this%20out:%20${post.item_name}`;
    window.open(link, '_blank');
  };

  return (
    <div
      className='ml-4 mt-50 sm:ml-60  sm:mt-4  overflow-hidden'
    >
      <Card
        sx={{
          marginTop: { xs: 8, sm: 0 },
          width: { xs: 470, sm: 'auto' },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(1, 1fr)',
            lg: 'repeat(2, 1fr)'
          },
          gap: 1,
          marginLeft: { xs: 0, sm: 1 },
          marginRight: { xs: 0, sm: 1 },
          // border: { sm: '1px solid black' }
        }}>
        <StyledCardMedia
          component="img"
          // style={{ width: 600, objectFit: 'cover' }}
          image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
          alt={post.item_name}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: '#f6f6f6' ,pt:5}}>
          <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
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
          <Box sx={{p: 2}}>
          <TableContainer component={Paper}><Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <h1 className='text-xl text-slate-600'>Post by :</h1>
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
          </Box>


          <Stack sx={{ mb: 2, mt: 3,p:2 }}>
            <Button
              sx={{
                width: { xs: 440, sm: 510 },
                backgroundColor: '#fb8f36',
                '&:hover': {
                  backgroundColor: '#fa7305',
                },boxShadow:5
              }}
              onClick={sendWhatsAppMessage} >
              Contact {post.user_name} on WhatsApp
            </Button>
          </Stack>

        </Box>
      </Card>

    </div>
  );
};

export default PostPage;
