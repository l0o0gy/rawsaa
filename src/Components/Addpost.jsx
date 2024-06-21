import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { useState, useContext } from 'react';
import { PostContext } from '../Components/contacts/store';
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

function Addpost() {
  const { posts, setPosts } = useContext(PostContext);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);



  const handlePhotoChange = (e) => {
    setSelectedPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      photo: selectedPhoto,
      itemName,
      description,
      location,
      categories,
    };
    setPosts([...posts, newPost]);
    setShowBox(false);
    alert('Post successfully');  
  };
  
  const handleClick = () => {
    setShowBox(!showBox);
  };

  return (
    <div>
       <Box sx={{ '& > :not(style)': { m: 1 ,backgroundColor:'rgb(219, 110, 31)',color:'white', position: 'fixed', bottom: 20, right: 20} }}>
      <Fab color=""  aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </Box>
    
    {showBox && (
    <Box className="flex justify-center fixed sm:ml-96">
        <div className='text-center p-6 border-2  bg-white mt-10'>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} /> <br />
            {selectedPhoto && <img src={URL.createObjectURL(selectedPhoto)} alt={itemName} className='w-60' />}
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
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                    required
                  />
                  {option.title}
                </li>
              )}
              sx={{ width: { xs: 300, md: 500 }, marginTop: "10px" }}
              renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
              )}
            />
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md mt-2 text-white drop-shadow-md w-full"> Add </button>
          </form>
        </div>
      </Box>
    )}
    </div>
  );
}

export default Addpost;
