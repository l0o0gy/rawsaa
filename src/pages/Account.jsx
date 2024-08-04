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
import Grid from '@mui/material/Grid';

function Account() {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const cookies = Cookies.get('token');

  useEffect(() => {
    let getuser_id = 0;

    axios
      .get('https://mena.alraed1.com/checkRole', {
        headers: {
          'Content-Type': 'application/json',
          theToken: `Bearer ${cookies}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        getuser_id = response.data.user_id;

        axios
          .get(`https://mena.alraed1.com/userInfo/${getuser_id}`)
          .then((response) => {
            setData(response.data);
            setFormData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching user info:', error);
          });
      })
      .catch((error) => {
        console.error('Error checking role:', error);
      });
  }, [cookies]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    axios
      .post('https://mena.alraed1.com/updateUserInfo', formData, {
        headers: {
          'Content-Type': 'application/json',
          theToken: `Bearer ${cookies}`,
        },
      })
      .then((response) => {
        setData(formData);
        setIsEditing(false);
        console.log('User info updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating user info:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className=" ml-5 mt-14 sm:ml-64 sm:mt-2  ">
      <Box>
        <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
        <Avatar
          src="https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg"
          alt="User Avatar"
          sx={{ width: {xs:100 , sm:200}, height: {xs:100 , sm:200} }}
        />
        <div className=" sm:ml-5">
          <h1 className="  text-xl  mt-5 sm:text-3xl sm:ml-10 sm:mt-20 text-slate-800">{data.name}</h1>
          <p className="  text-lg sm:text-2xl sm:ml-10 text-slate-500">{data.user_number}</p>
        </div>
      </Stack>
      <Divider />
      <Box
        component="form"
        sx={{
          display: 'grid',
          gridTemplateColumns:{xs:'1fr', sm:'repeat(2, 1fr)'},
          gap: 2,
          mt: {xs:1 ,sm:2},
          // mx: 'auto',
          maxWidth: { xs:'350px',sm:'800px'},
          textAlign:'start'
        }}
        noValidate
        autoComplete="off"
      >
        <Box>
          <FormLabel>First Name</FormLabel>
          <TextField
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
            fullWidth
          />
        </Box>
        <Box>
          <FormLabel>Last Name</FormLabel>
          <TextField
            name="lastName"
            value={formData.lastName || ''}
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
            name="location"
            value={formData.location || ''}
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
        <Box>
          <FormLabel>Password</FormLabel>
          <TextField
            name="password"
            type="password"
            value={formData.password || ''}
            onChange={handleChange}
            disabled={!isEditing}
            fullWidth
          />
        </Box>
      </Box>
      <div className="mt-5 rounded-md	">
        {isEditing ? (
          <Button
           variant="contained"
          //  color='none'
           sx={{
            backgroundColor: 'orange',
            '&:hover': { backgroundColor: 'orange' },
            width: {xs:350,sm:800},
            marginBottom:{xs:2}          
          }}
           onClick={handleUpdateClick} >
            Update
          </Button>
        ) : (
          <Button 
          variant="contained" 
          // color='none'
          sx={{
            backgroundColor: 'orange',
            '&:hover': { backgroundColor: 'orange' },
            width: {xs:350,sm:800},
            marginBottom:{xs:2}
          }}          onClick={handleEditClick} >
            Edit
          </Button>
        )}
      </div>
      </Box>
      
    </div>
  );
}

export default Account;
