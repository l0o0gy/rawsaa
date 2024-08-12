import React, { useState,useEffect } from 'react';
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

function AddPost() {
  const { setPosts, onPostAdded }=useState(null)
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [categories, setCategories] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [img_id, setImgId] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const cookies = Cookies.get('token');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
        console.log('User authenticated');
        setIsAuthenticated(true); 
      } catch (error) {
        console.error('Error checking role:', error);
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
      const { data } = await axios.post('https://mena.alraed1.com/imgPosts', formData);
      return data.filePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    let getuser_id = 0;
    let getuser_number = 0;
  let data={}
    try {
        data = await axios.get('https://mena.alraed1.com/checkRole', {
        headers: {
          'Content-Type': 'application/json',
          'theToken': `Bearer ${cookies}`
        }
      });       
      console.log(data.data);
      getuser_id = data.data.user_id;
      getuser_number =  data.data.user_number;
      setIsAuthenticated(true);
      console.log(true)
    } catch (error) {
      console.error('Error checking role:', error);
      setIsAuthenticated(false);
    }
  
    const id = uuidv4();
    await uploadImg(id);
  
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const day = now.getDate();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const year = now.getFullYear();
  
    const newPost = {
      user_id: getuser_id,
      first_name:data.data.first_name,
      last_name:data.data.last_name,
      imgUser_id:data.data.imgUser_id,
      user_number :getuser_number, 
      item_name: itemName,
      description: description,
      category: categories.map(category => category.title).join(', '),
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}:${seconds}`,
      status: 'active',
      img_id: id
    };
    console.log(newPost);
  try{
    axios.post('https://mena.alraed1.com/posts', newPost)
        setShowBox(false);
        setAlertMessage('Post successfully added');
        setAlertOpen(true);
        getData(); 
        onPostAdded(); 
    } catch(err){
      console.log(err)
        setShowBox(false);
        setAlertMessage('Error adding post');
        setAlertOpen(true);
      };
  };
  
  const getData = () => {
    axios.get('https://mena.alraed1.com/posts/0/10')
      .then((res) => {
        setPosts(res.data); 
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
  const closeDialog=()=>{
    setShowBox(false)
  }

  return (
    <div>
      {isAuthenticated &&
      <Box sx={{ '& > :not(style)': { m: 1, backgroundColor: 'rgb(219, 110, 31)', color: 'white', position: 'fixed', bottom: 20, right: 20 } }}>
        <Fab color="" aria-label="add" onClick={handleClick}>
          <AddIcon />
        </Fab>
      </Box>
}
      {showBox && isAuthenticated && (
        <Box className="fixed sm:ml-96 z-10 mt-14">
          <div className='text-center p-6 border-2 bg-white shadow-orange-400 shadow-lg'>
            <form onSubmit={handleSubmit}>
            <label
                for="imgPost"
                className="  bg-gray-500 p-2 rounded px-4 "
              >
            <PhotoLibraryRoundedIcon />
            <span class='pl-1'>Add post {isAuthenticated} Photo</span>
            </label>
            <input type="file"  required  hidden id='imgPost' accept="image/*" onChange={handlePhotoChange} /> <br />
              {selectedPhoto && <img src={`https://mena.alraed1.com/imgPosts/${img_id}.jpg`}
              alt={img_id}
              onChange={(e) => setImgId(e.target.value)}
              className='w-60' 
              />}
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
              <div class='flex justify-evenly'>
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 p-2 rounded-md mt-2 text-white drop-shadow-md px-20 "> Add </button>
              <button onClick={closeDialog} className="bg-gray-500 hover:bg-gray-800 p-2 rounded-md mt-2 text-white drop-shadow-md px-20 "> Close </button>
              </div>
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