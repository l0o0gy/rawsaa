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

  const handleLogin = () => {
    Cookies.set('isAuthenticated', 'true');
    navigate('/');
  };

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

    fetch('https://x8ki-letl-twmt.n7.xano.io/api:B8mXd58e/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Invalid email or password');
        }
        return res.json();
      })
      .then((resData) => {
        console.log("Response data:", resData);
        Cookies.set('isAuthenticated', 'true');
        navigate('/');
      })
      .catch((err) => {
        console.error("Error:", err.message);
        setError(err.message);
      });
  };

  return (
    <div>
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
                {error && <Typography color="error">{error}</Typography>}
                <Button type="submit" sx={{ mt: 1, backgroundColor: "#f98306" }}>
                  Log in
                </Button>
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
    </div>
  );
}
