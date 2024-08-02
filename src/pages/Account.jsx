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
    <div className="ml-64 mt-2 text-center align-middle">
      <Stack direction="row" spacing={2} sx={{ marginBottom: '20px' }}>
        <Avatar
          src="https://mena.alraed1.com/imgUsers/2dcccde4-67f3-486c-8d42-55d4cda172d4.jpg"
          alt="User Avatar"
          sx={{ width: 200, height: 200 }}
        />
        <div className="ml-5">
          <h1 className="text-3xl ml-10 mt-20 text-slate-800">{data.name}</h1>
          <p className="text-2xl text-slate-500">{data.user_number}</p>
        </div>
      </Stack>
      <Divider />
      <Box
        component="form"
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 2,
          mt: 2,
          mx: 'auto',
          maxWidth: '600px',
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
      <div className="mt-5">
        {isEditing ? (
          <Button variant="contained" color="primary" onClick={handleUpdateClick}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="secondary" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}

export default Account;
