import React, { useState } from 'react';
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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

function AddPost({ setPosts }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const uploadImg = async () => {
    if (!selectedPhoto) return null;

    const formData = new FormData();
    formData.append('post', selectedPhoto);

    try {
      const { data } = await axios.post('https://mena.alraed1.com/imgPosts', formData);
      return data.filePath; // Adjust based on the response structure of your API
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imagePath = await uploadImg();

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDate();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();

    const newPost = {
      user_id: '1',
      item_name: itemName,
      description: description,
      category: categories.map(category => category.title).join(', '),
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      status: 'active',
      image_path: imagePath
    };

    axios.post('https://mena.alraed1.com/posts', newPost)
      .then((res) => {
        setShowBox(false);
        setAlertMessage('Post successfully added');
        setAlertOpen(true);
        getData(); // Update posts after successful addition
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setShowBox(false);
        setAlertMessage('Error adding post');
        setAlertOpen(true);
      });
  };

  const getData = () => {
    axios.get('https://mena.alraed1.com/posts/0/10')
      .then((res) => {
        setPosts(res.data); // Update posts state with new data
        console.log(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClick = () => {
    setShowBox(!showBox);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1, backgroundColor: 'rgb(219, 110, 31)', color: 'white', position: 'fixed', bottom: 20, right: 20 } }}>
        <Fab color="" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </Box>
      {showBox && (
        <Box className="flex justify-center fixed sm:ml-96 z-10">
          <div className='text-center p-6 border-2 bg-white mt-10'>
            <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*" onChange={handlePhotoChange} /> <br />
              {selectedPhoto && <img src={'https://mena.alraed1.com/imgPosts/rawssha.png'} alt={itemName} className='w-60' />}
              <TextField
                id="outlined-basic"
                label="Name of item"
                variant="outlined"
                sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                required
              /> <br />
              <TextField
                id="outlined-basic"
                label="Description"
                variant="outlined"
                sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              /> <br />
              <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              /> <br />
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={data}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                onChange={(event, newValue) => setCategories(newValue)}
                renderOption={(props, option, { selected }) => {
                  const { key, ...otherProps } = props;
                  return (
                    <li key={key} {...otherProps}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  );
                }}
                sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Checkboxes" placeholder="Categories" />
                )}
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md mt-2 text-white drop-shadow-md w-full"> Add </button>
            </form>
          </div>
        </Box>
      )}
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success">
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AddPost;
