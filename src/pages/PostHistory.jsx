import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MediaControlCard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [history, setHistoryState] = useState([]);
  const [getuser_id, setGetuserId] = useState(0);
  const [deleteId, setDeleteId] = useState(null); 
  const [open, setOpen] = useState(false);
  const cookies = Cookies.get('token');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
        console.log('Fetched user_id:', data.user_id);
        setGetuserId(data.user_id);
      } catch (error) {
        console.error('Error checking role:', error);
        navigate('/loginpage');
      }
    };

    fetchUserId();
  }, [cookies, navigate]);

  useEffect(() => {
    if (getuser_id === 0) return;

    axios.get(`https://mena.alraed1.com/userPosts/${getuser_id}/0/20`)
      .then((res) => {
        console.log('Fetched posts:', res.data.result);
        setHistoryState(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [getuser_id]);

  const handlePostAdded = () => {
    if (getuser_id === 0) return;

    axios.get(`https://mena.alraed1.com/userPosts/${getuser_id}/0/20`)
      .then((res) => {
        setHistoryState(res.data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickOpen = (id) => {
    setDeleteId(id); 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null); 
  };

  const deletePost = async () => {
    if (!deleteId) return; 
    try {
      await axios.delete(`https://mena.alraed1.com/deletePosts/${deleteId}`);
      handlePostAdded();
      handleClose();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="mt-20 ml-4 sm:ml-64 sm:mt-20">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
        {history.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 2, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, width: { xs: 350, sm: "auto" } }}>
            <CardMedia
              component="img"
              sx={{ width: { xs: '100%', sm: 200 }, height: { xs: '100%' }, objectFit: 'cover' }}
              image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
              alt={post.item_name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <CardContent sx={{ flex: '1 0 auto', p: 2 }}>
                <Typography component="div" sx={{ fontSize: { xs: 17, sm: 30 } }}>
                  Name of item: {post.item_name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Description: {post.description}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Date of post: {post.date}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                  Time of post: {post.time}
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={2} sx={{ mb: 2, ml: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="error"
                  sx={{ width: { xs: 90 } }}
                  onClick={() => handleClickOpen(post.id)}
                >
                  Delete
                </Button>
                <Button variant="contained" endIcon={<EditIcon />} sx={{ bgcolor: '#f97806', width: { xs: 90 } }}>
                  Edit
                </Button>
              </Stack>
            </Box>
          </Card>
        ))}
      </Box>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{" Are you absolutely sure you want to delete this post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once deleted, the post will be permanently removed and cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletePost}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
