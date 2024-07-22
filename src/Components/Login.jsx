import React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
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

export default function LoginFinal() {
  const [data, setData] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const isAuthenticated = Cookies.get('isAuthenticated') === 'true';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting data:", data);

    axios.post('https://mena.alraed1.com/login', {username:data.name ,password:data.password})
      .then((res) => {
        console.log("Response data:", res.data);
        Cookies.set('isAuthenticated', 'true');
        Cookies.set('token', res.data.token); 
        Cookies.get('token')
        console.log(Cookies.get('token'));
      
        navigate('/');
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(err.message);
      });
  };

  // const handleGoogleSuccess = (response) => {
  //   console.log("Google login success:", response);
  //   // Here, you would send the token to your backend to validate and create a session
  //   Cookies.set('isAuthenticated', 'true');
  //   navigate('/');
  // };

  // const handleGoogleFailure = (error) => {
  //   console.error("Google login failure:", error);
  //   setError("Google login failed");
  // };

  return (
    <GoogleOAuthProvider clientId="428522722446-tkus8avc6t0d0n47nng1667l49nof2h9.apps.googleusercontent.com">
      <CssVarsProvider>
        <main>
          <ModeToggle />
          <CssBaseline />
          <Sheet
            sx={{
              width: 300,
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
            {isAuthenticated ? (
              <Typography variant="h4" component="h1" sx={{ textAlign: 'center' }}>
                Welcome back!
              </Typography>
            ) : (
              <form onSubmit={handleSubmit}>
                <Typography level="h4" component="h1">
                  <b>Welcome!</b>
                </Typography>
                <Typography level="body-sm">Sign in to continue.</Typography>
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
                  <FormLabel>Password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    placeholder="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                </FormControl>
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" sx={{ mt: 1, backgroundColor: "#f98306" }}>
                  Log in
                </Button>
                {/* <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleFailure}
                  text="signin_with"
                  width="260"
                  marginTop="10px"
                /> */}
                <Typography
                  endDecorator={<Link href="/signuppage">Sign up</Link>}
                  fontSize="sm"
                  sx={{ alignSelf: 'center' }}
                >
                  Don&apos;t have an account?
                </Typography>
              </form>
            )}
          </Sheet>
        </main>
      </CssVarsProvider>
    </GoogleOAuthProvider>
  );
}