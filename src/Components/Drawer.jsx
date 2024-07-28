import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import img from '../assets/img/rawsshaa.png';
import Cookies from 'js-cookie';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

const drawerWidth = 240;
function ResponsiveDrawer({ window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [checkToken, setIsAuthenticated] = React.useState(Cookies.get('token'));

  
  React.useEffect(() => {
    const handleCookieChange = async () => {
      try {
        const cookies = Cookies.get('token'); // Assuming 'token' is the cookie name
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`
          }
        });
        console.log(data);
      } catch (error) {
        console.error('Error fetching authentication status:', error);
        Cookies.remove('token');
      }
    };
    // Set up a mutation observer to watch for changes in the cookies
    const observer = new MutationObserver(handleCookieChange);
    observer.observe(document, {
      attributes: true,
      attributeFilter: ['cookie'],
    });
  
    // Initial check
    handleCookieChange();
  
    return () => {
      observer.disconnect();
    };
  }, []);
  
  const location = useLocation();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const navigate = useNavigate();

  const goToPage = (path, index) => () => {
    setActiveButton(index);
    navigate(path);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/Loginpage');
  };

  const handleBackbutton = () => {
    navigate(-1);
  };
  const drawer = (
    <div>
      <img src={img} alt="logo" className="w-40 pl-3 pt-3" />
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton
            onClick={goToPage('/')}
            sx={{
              backgroundColor: location.pathname === '/' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/' ? 'orange' : 'lightgray',
              }
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Saved" disablePadding>
          <ListItemButton
            onClick={goToPage('/savepage')}
            sx={{ backgroundColor: location.pathname === '/savepage' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/savepage' ? 'orange' : 'lightgray',
              }
             }}
          >
            <ListItemIcon>
              <BookmarkAddedIcon />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Language" disablePadding>
          <ListItemButton
            onClick={goToPage('/languagepage')}
            sx={{ backgroundColor: location.pathname === '/languagepage' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/languagepage' ? 'orange' : 'lightgray',
              }
             }}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {['History', 'Messages', 'Call us'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={text === 'History' ? goToPage('/history', index) : (text === 'Messages' ? goToPage('/messagepage', index) : undefined)}
              sx={{ backgroundColor: activeButton === index + 3 ? 'orange' : 'inherit' }}
            >
              <ListItemIcon>
                {index === 0 ? <AddBoxIcon /> : (index === 1 ? <MessageIcon /> : <CallIcon />)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {checkToken ? (
          ['Account', 'Log Out', 'Delete account'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={text === 'Log Out' ? handleLogout : undefined}
                sx={{ backgroundColor: activeButton === index + 6 ? 'orange' : 'inherit' }}
              >
                <ListItemIcon>
                  {index === 0 ? <AccountCircleIcon /> : (index === 1 ? <LogoutIcon /> : <PersonRemoveIcon />)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          ['Login', 'Sign Up'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={text === 'Login' ? goToPage('/Loginpage', index + 9) : goToPage('/signuppage', index + 9)}
                sx={{ backgroundColor: activeButton === index + 9 ? 'orange' : 'inherit' }}
              >
                <ListItemIcon>
                  {index === 0 ? <LoginIcon /> : <PersonAddIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))
        )}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ display: { sm: 'none' }, backgroundColor: 'white', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, mt: 0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <input type="text" placeholder="search..." className="w-5/6 mt-1  border h-8 rounded-full p-2 pr-3 " />
            <IconButton
              color="black"
            // aria-label="back"
            // edge="start"
            // sx={{ ml: 0, mt: 0 }}
            >
              <SearchIcon />
            </IconButton>
          </Box>
          <IconButton
            color="black"
            aria-label="back"
            edge="start"
            onClick={handleBackbutton}
            sx={{ ml: 2, mt: 0 }}
          >
            <ArrowForwardIosIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', marginTop: 0, width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;