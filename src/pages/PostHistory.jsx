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
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import ResponsiveDrawer from '../Components/Drawer'
import img from '../assets/img/item-not-found.png'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const data = [
  { title: "Houseware" },
  { title: "Office Ware" },
  { title: "Electronics" },
  { title: "Furniture" },
  { title: "Car Accessories" },
  { title: "Books" },
  { title: "Antiques" },
  { title: "Electrical Devices" }
];

export default function MediaControlCard() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [history, setHistoryState] = useState([]);
  const [getuser_id, setGetuserId] = useState(0);
  const [deleteId, setDeleteId] = useState(null);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editPost, setEditPost] = useState(null);
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

  const handleClickOpenEdit = (post) => {
    setEditPost(post);
    setEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    setDeleteId(null);
    setEditPost(null);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (!editPost || !editPost.id) return;

    const updatePost = async () => {
      try {
        await axios.put(`https://mena.alraed1.com/updatePost/${editPost.id}`, editPost);
        console.log(`Post ${editPost.id} updated successfully`);
      } catch (error) {
        console.error("Error updating post:", error);
      }
    };

    updatePost();
  }, [editPost]);

  const handleCategoryChange = (event) => {
    const { value } = event.target;
    setEditPost(prev => ({
      ...prev,
      category: value
    }));
  };

  return (
    <>
      < ResponsiveDrawer />

      <div className="mt-20 ml-4 sm:ml-60 sm:mt-5">
        {history.length > 0 ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(1, 1fr)', md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }, gap: { xs: 0, sm: 1 }, marginLeft: { xs: 0, sm: 1 }, marginRight: { xs: 0, sm: 4 } }}>
            {history.map((post) => (
              <Card key={post.id} sx={{ marginBottom: 2, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 2, width: { xs: "95%", sm: "auto" }, padding: 1, border: '1px solid gray', borderRadius: "2px" }}>

                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: 150, sm: 200 }, height: { xs: 150, sm: "100%" },
                    objectFit: 'cover',
                  }}
                  image={`https://mena.alraed1.com/imgPosts/${post.img_id}.jpg`}
                  alt={post.item_name}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
                  <CardContent sx={{ flex: '1 0 auto', p: { sm: 2, sm: 'auto' }, paddingBottom: { xs: 1, sm: 'auto' }, marginTop: { xs: '-10px' }, marginLeft: { xs: '-15px', sm: 0 } }}>
                    <Typography component="div" sx={{ fontSize: { xs: 14, sm: 20 } }}>
                      Name of item: {post.item_name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: { xs: 14, sm: 20 }, height: { xs: 25, sm: 30 }, overflow: 'hidden' }}>
                      Description: {post.description}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: { xs: 14, sm: 20 } }}>
                      Date: {post.date}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" sx={{ fontSize: { xs: 14, sm: 20 } }}>
                      Time: {post.time}
                    </Typography>
                  </CardContent>
                  <Stack direction="row" spacing={{ xs: 1, sm: 2 }} sx={{ mb: 2, ml: { xs: 0, sm: 2 } }}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon sx={{ width: { xs: 18, sm: 'auto' }, marginRight: { xs: '-10px', sm: 'auto' } }} />}
                      color="error"
                      sx={{ width: { xs: 58, sm: 90 }, height: { xs: 30, sm: 'auto' }, fontSize: { xs: 12, sm: 'auto' } }}
                      onClick={() => handleClickOpen(post.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<EditIcon sx={{ width: { xs: 18, sm: 'auto' }, marginLeft: { xs: '-5px', sm: 'auto' } }} />}
                      onClick={() => handleClickOpenEdit(post)}
                      sx={{ bgcolor: '#f97806','&:hover':{bgcolor: '#f97806'}, width: { xs: 55, sm: 90 }, height: { xs: 30, sm: 'auto' }, fontSize: { xs: 12, sm: 'auto' }, marginLeft: { xs: '-60px', sm: 'auto' } }}
                    >
                      Edit
                    </Button>
                  </Stack>
                </Box>
              </Card>
            ))}
          </Box>
        ) : (
          <div className='justify-center mt-24 w-96 sm:ml-16 flex lg:mt-20 lg:ml-80 '>
            <img src={img} alt='item-not-found' />
          </div>
        )}
        <Dialog
          fullScreen
          open={edit}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: 'relative' }}>
            <Toolbar style={{ backgroundColor: 'orange' }}>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Edit your Post
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                Save
              </Button>
            </Toolbar>
          </AppBar>
          {editPost && (
            <List className='grid sm:grid-cols-2'
            >
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <CardMedia
                  component="img"
                  sx={{ width: { xs: 350, sm: 400, md: 500 }, height: { xs: 350, sm: 400, md: 500 }, objectFit: 'cover', ml: { xs: 0, sm: 5 } }}
                  image={`https://mena.alraed1.com/imgPosts/${editPost.img_id}.jpg`}
                  alt={editPost.item_name}
                />
              </Box>
              <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
                <CardContent sx={{ flex: '1 0 auto', p: 2, ml: { xs: 0, sm: 5 }, width: { xs: 350 } }}>
                  <Typography component="div" variant="subtitle1"
                    // sx={{ fontSize: { xs: 17, sm: 30 } }}
                    color="text.secondary"
                  >
                    Name of item:
                    <TextField
                      name="item_name"
                      value={editPost.item_name || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" color="text.secondary" component="div">
                    Description:
                    <TextField
                      name="description"
                      value={editPost.description || ''}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle1" color="text.secondary" component="div"
                    sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,fr)' }}
                  >
                    Category:
                    <FormGroup  >
                      {data.map((category) => (
                        <FormControlLabel
                          key={category.title}
                          control={
                            <Checkbox
                              checked={editPost.category === category.title}
                              onChange={handleCategoryChange}
                              value={category.title}
                            />
                          }
                          label={category.title}
                        />
                      ))}
                    </FormGroup>
                  </Typography>
                </CardContent>
              </Box>
            </List>
          )}
        </Dialog>

        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Are you absolutely sure you want to delete this post?"}</DialogTitle>
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
    </>
  );
}
