// SignUpFinal.js
import React, { useState } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import Alert from '@mui/joy/Alert';
import { v4 as uuidv4 } from 'uuid';

export default function  SignUpFinal() {
  const [data, setData] = useState({ name: '', email: '', password: '', phone_number: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [photo, setPhoto] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    await uploadImg(id);

    axios.post('https://mena.alraed1.com/register', {
      username: data.name,
      email: data.email,
      password: data.password,
      user_number: data.phone_number,
      status: 'active',
      role: 'user',
      img_id: id ,
    }) 
      .then((res) => {
        setSuccessMessage('Sign-up successful! Redirecting to login page...');
        setErrorMessage('');
        setTimeout(() => {
          navigate('/loginpage');
        }, 3000);
      }) 
      .catch((err) => {
        setErrorMessage('Sign-up failed. Please try again.');
        setSuccessMessage('');
      });

  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const uploadImg = async (id) => {
    if (!photo) return null;

    const renamedFile = new File([photo], `${id}.jpg`, {
      type: photo.type,
      lastModified: photo.lastModified,
    });

    const formData = new FormData();
    formData.append('user', renamedFile);

    try {
      const { data } = await axios.post('https://mena.alraed1.com/imgUsers', formData);
      return data.filePath;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet
        sx={{
          width: 350,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <form onSubmit={handleSubmit}>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign up to continue.</Typography>
          <FormControl>
            <FormLabel>Photo</FormLabel>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={data.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
              endDecorator={
                <IconButton onClick={handleTogglePasswordVisibility}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phone_number"
              type="text"
              placeholder="Phone number"
              value={data.phone_number}
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" sx={{ mt: 1, backgroundColor: '#f98306' }}>
            Sign up
          </Button>
          {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
          {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
          <Typography
            endDecorator={<Link href="/loginpage">Log in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Already have an account?
          </Typography>
        </form>
      </Sheet>
    </CssVarsProvider>
  );
}

// export default SignUpFinal;
