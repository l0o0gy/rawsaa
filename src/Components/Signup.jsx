import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import img from '../assets/img/orang.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/joy/Alert';
import { v4 as uuidv4 } from 'uuid';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="soft">Change mode</Button>;
  }

  return (
    <Button
      variant="soft"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

export default function SignUpFinal() {
  const [data, setData] = useState({ name: '', email: '', password: '', phone_number: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [photo,setPhoto] = useState('')
  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let img_id = 0 ;
    const id = uuidv4();
    await uploadImg(id);


    // console.log('Submitting data:', data);

    axios.post('https://mena.alraed1.com/register', {

      username: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phone_number,
      status: 'active',
      role: 'user',
      img_id:id
    })
      .then((res) => {
        console.log('Response data:', res.data);
        setSuccessMessage('Sign-up successful! Redirecting to login page...');
        setErrorMessage('');
        setTimeout(() => {
          goToLoginPage();
        }, 3000); // Redirect after 3 seconds
      })
      .catch((err) => {
        console.error('Error:', err.message);
        setErrorMessage('Sign-up failed. Please try again.');
        setSuccessMessage('');
      });

  };

  const LoginPage = useNavigate();

  const goToLoginPage = () => {
    LoginPage('/loginpage');
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
      return data.filePath; // Adjust based on the response structure of your API
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return (
    <div>
      <CssVarsProvider>
        {/* <img src={img} style={{ position: 'fixed' }} /> */}
        <main>
          <ModeToggle />
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
              <div>
                <Typography level="h4" component="h1">
                  <b>Welcome!</b>
                </Typography>
                <Typography level="body-sm">Sign up to continue.</Typography>
              </div>
              <FormControl>
                <FormLabel>Photo</FormLabel>
                <input type="file" accept="image/*" 
                onChange={handlePhotoChange}
                // onChange={(e) => handlePhotoChange(e.target.value)}
                 />
                {/* {photo && <img src={`https://mena.alraed1.com/imgUsers/${img_id}.jpg`} 
              alt={img_id} 
              
              className='w-60' 
              />} */}
              </FormControl>

              {/* <FormControl>
                <FormLabel>Photo</FormLabel>
                <Input
                  name="photo"
                  type="file"
                  onChange={handlePhotoChange}
                />
              </FormControl> */}
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  type="text"
                  placeholder="name"
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
                  type="password"
                  placeholder="password"
                  value={data.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone_number"
                  type="text"
                  placeholder="phone number"
                  value={data.phone_number}
                  onChange={handleChange}
                />
              </FormControl>
              <Button type="submit" sx={{ mt: 1, backgroundColor: '#f98306' }}>
                Sign up
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
              <Typography
                endDecorator={<Link href="/loginpage">Log in</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
                onClick={goToLoginPage}
              >
                Don&apos;t have an account?
              </Typography>
            </form>
          </Sheet>
        </main>
      </CssVarsProvider>
    </div>
  );
}