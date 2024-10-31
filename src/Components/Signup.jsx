import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import img from '../assets/img/rawsshalogo.png'

const theme = createTheme();
export default function SignUpFinal() {
  const [data, setData] = useState({ name: '', email: '', password: '', phone_number: '' });
  const [photo, setPhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const uploadImg = async (id) => {
    if (!photo) return null;

    const renamedFile = new File([photo], `${id}.jpg`, {
      type: photo.type,
      lastModified: photo.lastModified,
    });

    const formData = new FormData();
    formData.append("user", renamedFile);

    try {
      const { data } = await axios.post(
        "https://mena.al-massrah.com/imgUsers",
        formData
      );
      return data.filePath;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    let id = 0;
    e.preventDefault();
    if (photo) {
      id = uuidv4();
    }
    await uploadImg(id);

    axios
      .post("https://mena.al-massrah.com/register", {
        username: data.name,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
        user_number: data.phone_number,
        status: "active",
        role: "user",
        img_id: id,
      })
      .then((res) => {
        setSuccessMessage("Sign-up successful! Redirecting to login page...");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/loginpage");
        }, 3000);
      })
      .catch((err) => {
        setErrorMessage("Sign-up failed. Please try again.");
        setSuccessMessage("");
      });
  };

  const goToPage = (path) => () => {
    navigate(path);
  };

  return (
    <ThemeProvider theme={theme} sx={{ overflow: "hidden" }}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={false}
          md={7}
          sx={{
            backgroundImage: `url(${img})`,
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "left",
          }}
        />
        <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 2,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{ bgcolor: "secondary.main", backgroundColor: "orange" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth margin="normal">
                <input
                  type="file"
                  hidden
                  id="imgUser"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              </FormControl>
              <FormControl className="flex justify-center  w-full ">

                <label
                  for="imgUser"
                  className="border-sky-100  bg-slate-100 p-2 rounded  px-4 m-0 "
                >
                  <AddAPhotoRoundedIcon />
                  <span class=' pl-1 pt-4 mt-4 text-black '> Add Photo</span>
                </label>
              </FormControl>
              <Box sx={{ display: { md: 'flex' }, justifyContent: { md: 'space-evenly' }, width: { md: '400' } }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="first_name"
                  name="first_name"
                  autoComplete="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="last_name"
                  name="last_name"
                  autoComplete="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                  autoFocus
                />
              </Box>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={data.email}
                onChange={handleChange}
              />
              <FormControl fullWidth>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  }}
                />
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone_number"
                label="Phone Number"
                type="text"
                value={data.phone_number}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  backgroundColor: "#f98306",
                  '&:hover':{
                    backgroundColor: "#f98306",
                  },
                }}
              >
                Sign Up
              </Button>
              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              {/* <Typography
                endDecorator={<Link href="/loginpage">Log in</Link>}
                fontSize="sm"
                sx={{ alignSelf: "center" }}
              >
                
              </Typography> */}
              <Grid item
                onClick={goToPage('/loginpage')}
              >
                <Link href="" variant="body2">
                  {"Already have an account? Log in"}
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
