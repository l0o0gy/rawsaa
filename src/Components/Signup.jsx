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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting data:', data);

    axios.post('https://mena.alraed1.com/register ', {
      username:data.name,
      // name:'mustafaEsam',
      email:data.email,
      password:data.password,
      phoneNumber:data.phone_number,
      status: 'active',
      role:"user",
    })
      .then((res) => {
        console.log('Response data:', res.data);
        // Handle successful sign-up (e.g., redirect, show message, etc.)
      })
      .catch((err) => {
        console.error('Error:', err.message);
        // Handle errors
      });
  };

  const LoginPage = useNavigate();

  const goToLoginPage = () => {
    LoginPage('/loginpage');
  };

  return (
    <div>
      <CssVarsProvider>
        <img src={img} style={{ position: 'fixed' }} />
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