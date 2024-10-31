import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ResponsiveDrawer from '../Components/Drawer'
import { v4 as uuidv4 } from 'uuid';
import TransformRoundedIcon from '@mui/icons-material/TransformRounded';

function Account() {
  const [data, setData] = useState({});
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [imgsrc, setImgsrc] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [userInfo, setuserInfo] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const cookies = Cookies.get("token");


  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get("https://mena.al-massrah.com/checkRole", {
        headers: {
          "Content-Type": "application/json",
          theToken: `Bearer ${cookies}`,
        },
      });
      console.log(response.data);
      setuserInfo(response.data);
    };

    fetchUserData();
  }, [cookies]);
    const handlePhotoChange = async(e) => {
    setSelectedPhoto(e.target.files[0])
    

  };

  const uploadImg = async (id) => {
    if (!selectedPhoto) return null;
    const renamedFile = new File([selectedPhoto], `${id}.jpg`, {
      type: selectedPhoto.type,
      lastModified: selectedPhoto.lastModified,
    });

    const formData = new FormData();
    formData.append('user', renamedFile);
       await axios.post('https://mena.alraed1.com/imgUsers', formData);
  return 'done'
  };

  const fetchUserInfo = async () => {
    const response = await axios.get(
      `https://mena.alraed1.com/userInfo/${userInfo.user_id}`
    );
    setData(response.data);
    setFormData(response.data);
    setImgsrc(response.data.img_id)

  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await axios.get(
        `https://mena.alraed1.com/userInfo/${userInfo.user_id}`
      );
      setData(response.data);
      setFormData(response.data);
      console.log(response.data.img_id)
      setImgsrc(response.data.img_id)
    };
    fetchUserInfo();
  }, [userInfo.user_id]);

  const handleEditClick = async() => {
    setIsEditing(true);
  };

  const handleUpdateClick = async () => {
    if(selectedPhoto){
      setImgsrc(0)
    }
    let id=uuidv4()
    await uploadImg(id);
      formData.img_id=id
    const response = await axios.put(
      `https://mena.alraed1.com/updateInfo/${userInfo.user_id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          theToken: `Bearer ${cookies}`,
        },
      }
    );

    console.log("User info updated:", response.data);
    fetchUserInfo();
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false),fetchUserInfo(), 3000);


  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
<div className="ml-5 mt-14 sm:ml-64 sm:mt-2">
      <ResponsiveDrawer />
      <Box>
        <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
          <Avatar
            src={
              imgsrc
                ? `https://mena.alraed1.com/imgUsers/${imgsrc}.jpg`
                : `https://ui-avatars.com/api/?name=${data.first_name}+${data.last_name}&background=22d3ee&color=fff`
            }
            alt="User Avatar"
            sx={{ width: { xs: 100, sm: 200 }, height: { xs: 100, sm: 200 } }}
          />
          <input
            type="file"
            required
            hidden
            id="imgPost"
            accept="image/*"
            onChange={handlePhotoChange}
          />
          <br />
          <label htmlFor="imgPost" className="absolute bg-orange-100 sm:p-2 sm:px-4 rounded ml-20 sm:left-96 sm:top-40 top-32 left-16 px-1 ">
            <TransformRoundedIcon className=' sm:w-auto ' />
          </label>

          <div className="sm:ml-5">
            <h1 className="text-xl mt-5 sm:text-3xl sm:ml-10 sm:mt-20 text-slate-800">
              {`${data.first_name} ${data.last_name}`}
            </h1>
            <p className="text-lg sm:text-2xl sm:ml-10 text-slate-500">
              {data.user_number}
            </p>
          </div>
        </Stack>
        <Divider />
        {showSuccessAlert && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Edit successfully
          </Alert>
        )}
        <Box
          component="form"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            mt: { xs: 1, sm: 2 },
            maxWidth: { xs: '320px', sm: '800px' },
            textAlign: 'start',
          }}
          noValidate
          autoComplete="off"
        >
          <Box>
            <FormLabel>First Name</FormLabel>
            <TextField
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>
          <Box>
            <FormLabel>Last Name</FormLabel>
            <TextField
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>
          <Box>
            <FormLabel>Phone Number</FormLabel>
            <TextField
              name="user_number"
              value={formData.user_number || ''}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>
          <Box>
            <FormLabel>Location</FormLabel>
            <TextField
              name="user_location"
              value={formData.user_location || ''}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>
          <Box>
            <FormLabel>Email Address</FormLabel>
            <TextField
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              fullWidth
            />
          </Box>
        </Box>
        <div className="mt-5 rounded-md">
          {isEditing ? (
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'orange',
                '&:hover': { backgroundColor: 'orange' },
                width: { xs: 320, sm: 800 },
                marginBottom: { xs: 2 },
              }}
              onClick={handleUpdateClick}
            >
              Update
            </Button>
          ) : (
            <Button
              variant="contained"
              sx={{
                backgroundColor: 'orange',
                '&:hover': { backgroundColor: 'orange' },
                width: { xs: 320, sm: 800 },
                marginBottom: { xs: 2 },
              }}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </div>
      </Box>
    </div>
  );
}

export default Account;
