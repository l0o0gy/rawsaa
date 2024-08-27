import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'js-cookie';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const categoryOptions = [
  { title: "Houseware" },
  { title: "Office Ware" },
  { title: "Electronics" },
  { title: "Furniture" },
  { title: "Car Accessories" },
  { title: "Books" },
  { title: "Antiques" },
  { title: "Electrical Devices" }
];

function AddPost() {
  const [posts, setPosts] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [imgId, setImgId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = Cookies.get('token');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
        setIsAuthenticated(true); 
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [cookies]);

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const uploadImg = async (id) => {
    if (!selectedPhoto) return null;

    const renamedFile = new File([selectedPhoto], `${id}.jpg`, {
      type: selectedPhoto.type,
      lastModified: selectedPhoto.lastModified,
    });

    const formData = new FormData();
    formData.append('post', renamedFile);

    try {
      const response = await axios.post('https://mena.alraed1.com/imgPosts', formData);
      return response.data.filePath;
    } catch (error) {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userId = 0;
    let userNumber = 0;
    let userData = {};
    try {
      const response = await axios.get('https://mena.alraed1.com/checkRole', {
        headers: {
          'Content-Type': 'application/json',
          'theToken': `Bearer ${cookies}`
        }
      });
      userData = response.data;
      userId = userData.user_id;
      userNumber = userData.user_number;
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    }

    const id = uuidv4();
    await uploadImg(id);

    const now = new Date();
    const newPost = {
      user_id: userId,
      first_name: userData.first_name,
      last_name: userData.last_name,
      imgUser_id: userData.imgUser_id,
      user_number: userNumber,
      item_name: itemName,
      description: description,
      category: categories.map(category => category.title).join(', '),
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0],
      status: 'active',
      img_id: id
    };

    try {
      await axios.post('https://mena.alraed1.com/posts', newPost);
      setAlertMessage('Post successfully added');
      setAlertOpen(true);
      setOpenDialog(false);
    } catch (err) {
      setAlertMessage('Error adding post');
      setAlertOpen(true);
    }
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      {isAuthenticated && (
        <Box sx={{ '& > :not(style)': { m: 1, position: 'fixed', backgroundColor: '#fe8801', '&hover':{backgroundColor: '#fe8801'}, bottom: 20, right: 20 } }}>
          <Fab color="" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Box>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{color:'orange', textAlign:'center'}}>
          Add a New Post
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="postForm">
            <label htmlFor="imgPost" className=" bg-orange-200 p-2 rounded px-4 ">
              <PhotoLibraryRoundedIcon />
              <span className="pl-1">Add Post Photo</span>
            </label>
            <input type="file" required hidden id="imgPost" accept="image/*" onChange={handlePhotoChange} /> <br />
            {selectedPhoto && (
              <img 
                src={`https://mena.alraed1.com/imgPosts/${imgId}.jpg`} 
                alt={imgId} 
                className="w-60" 
              />
            )}
            <TextField
              id="item-name"
              label="Name of item"
              variant="outlined"
              sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            /> <br />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            /> <br />
            <TextField
              id="location"
              label="Location"
              variant="outlined"
              sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            /> <br />
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categoryOptions}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={(event, newValue) => setCategories(newValue)}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              )}
              sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
              renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Categories" />
              )}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus sx={{color:'orange'}}>
            Close
          </Button>
          <Button type="submit" form="postForm" autoFocus sx={{color:'orange'}}>
            Add Post
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddPost;
