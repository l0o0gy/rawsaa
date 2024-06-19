import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { useState, useContext } from 'react';
import { PostContext } from '../Components/contacts/store';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  };
  const handelAlart=()=>{
    alert('post successfully') 
  }

  return (
    <div>
      <div className="flex justify-center">
        <div className='text-center p-10 border-2 bg-white mt-10'>
          <form onSubmit={handleSubmit}>
            <input type="file" accept="image/*" onChange={handlePhotoChange} /> <br />
            {selectedPhoto && <img src={URL.createObjectURL(selectedPhoto)} alt={itemName} className='w-60' />}
            <TextField
              id="outlined-basic"
              label="Name of item"
              variant="outlined"
              style={{ width: 500, marginTop: "10px" }}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            /> <br />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              style={{ width: 500, marginTop: "10px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /> <br />
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              style={{ width: 500, marginTop: "10px" }}
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
                  />
                  {option.title}
                </li>
              )}
              style={{ width: 500, marginTop: "10px" }}
              renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
              )}
            />
            <button type="submit" className="bg-orange-500 p-2 rounded-md mt-2 text-white drop-shadow-md w-full" onClick={handelAlart}> Add </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addpost;
