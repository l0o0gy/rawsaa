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
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate, useLocation } from 'react-router-dom';
import img from '../assets/img/rawsshaa.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const drawerWidth = 240;

function ResponsiveDrawer({ window, handleSearch }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeButton, setActiveButton] = React.useState(null);
  const [isClosing, setIsClosing] = React.useState(false);
  const [checkToken, setIsAuthenticated] = React.useState(Cookies.get('token'));
  const [seachinput, setSearchInput] = React.useState('');

  React.useEffect(() => {
    const handleCookieChange = async () => {
      try {
        const cookies = Cookies.get('token');
        const { data } = await axios.get('https://mena.alraed1.com/checkRole', {
          headers: {
            'Content-Type': 'application/json',
            'theToken': `Bearer ${cookies}`,
          },
        });
        // console.log(data);
      } catch (error) {
        console.error('Error fetching authentication status:', error);
        Cookies.remove('token');
      }
    };

    const observer = new MutationObserver(handleCookieChange);
    observer.observe(document, {
      attributes: true,
      attributeFilter: ['cookie'],
    });

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

  const handleBackButton = () => {
    navigate(-1);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = (value) => {
    axios.get(`https://mena.alraed1.com/postSearch/${value}`)
      .then((response) => {
        console.log(response.data)
            })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (value) => {
    setSearchInput(value);
    fetchData(value);
    handleSearch(value); // Call the parent component's handleSearch prop
  };
  const drawer = (
    <div>
      <img src={img} alt="logo" className="w-40 pl-3 pt-3" />
      <List>
        <ListItem key="Home" disablePadding>
          <ListItemButton
            onClick={goToPage('/', 0)}
            sx={{
              backgroundColor: location.pathname === '/' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/' ? 'orange' : 'lightgray',
              },
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
            onClick={goToPage('/savepage', 1)}
            sx={{
              backgroundColor: location.pathname === '/savepage' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/savepage' ? 'orange' : 'lightgray',
              },
            }}
          >
            <ListItemIcon>
              <BookmarkAddedIcon />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem key="Language" disablePadding>
          <ListItemButton
            onClick={goToPage('/languagepage', 2)}
            sx={{
              backgroundColor: location.pathname === '/languagepage' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/languagepage' ? 'orange' : 'lightgray',
              },
            }}
          >
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary="Language" />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
      <List>
        <ListItem key="History" disablePadding>
          <ListItemButton
            onClick={goToPage('/history', 3)}
            sx={{
              backgroundColor: location.pathname === '/history' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/history' ? 'orange' : 'lightgray',
              },
            }}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Messages" disablePadding>
          <ListItemButton
            onClick={goToPage('/messagepage', 4)}
            sx={{
              backgroundColor: location.pathname === '/messagepage' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/messagepage' ? 'orange' : 'lightgray',
              },
            }}
          >
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Messages" />
          </ListItemButton>
        </ListItem>
        {/* <ListItem key="Call us" disablePadding>
          <ListItemButton
            onClick={goToPage('/contact', 5)}
            sx={{
              backgroundColor: location.pathname === '/contact' ? 'orange' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === '/contact' ? 'orange' : 'lightgray',
              },
            }}
          >
            <ListItemIcon>
              <CallIcon />
            </ListItemIcon>
            <ListItemText primary="Call us" />
          </ListItemButton>
        </ListItem> */}
      </List>
      <Divider />
      <List>
        {checkToken ? (
          <>
            <ListItem key="Account" disablePadding>
              <ListItemButton
                onClick={goToPage('/accountpage', 6)}
                sx={{
                  backgroundColor: location.pathname === '/accountpage' ? 'orange' : 'inherit',
                  '&:hover': {
                    backgroundColor: location.pathname === '/accountpage' ? 'orange' : 'lightgray',
                  },
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Account" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Log Out" disablePadding>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  backgroundColor: location.pathname === '/logout' ? 'orange' : 'inherit',
                  '&:hover': {
                    backgroundColor: location.pathname === '/logout' ? 'orange' : 'lightgray',
                  },
                }}
              >
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Delete account" disablePadding>
              <ListItemButton
                onClick={handleClickOpen}
                sx={{
                  backgroundColor: location.pathname === '/deleteaccount' ? 'orange' : 'inherit',
                  '&:hover': {
                    backgroundColor: location.pathname === '/deleteaccount' ? 'orange' : 'lightgray',
                  },
                }}
              >
                <ListItemIcon>
                  <PersonRemoveIcon />
                </ListItemIcon>
                <ListItemText primary="Delete account" />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem key="Login" disablePadding>
              <ListItemButton
                onClick={goToPage('/loginpage', 8)}
                sx={{
                  backgroundColor: location.pathname === '/loginpage' ? 'orange' : 'inherit',
                  '&:hover': {
                    backgroundColor: location.pathname === '/loginpage' ? 'orange' : 'lightgray',
                  },
                }}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem key="Sign Up" disablePadding>
              <ListItemButton
                 onClick={goToPage('/signuppage', 9)}
                 sx={{
                   backgroundColor: location.pathname === '/signuppage' ? 'orange' : 'inherit',
                   '&:hover': {
                     backgroundColor: location.pathname === '/signuppage' ? 'orange' : 'lightgray',
                   },
                 }}
              >
                <ListItemIcon>
                  <PersonAddIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItemButton>
            </ListItem>
          </>
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
            <input
              type="text"
              placeholder="search..."
              className="w-5/6 mt-1 border h-8 rounded-full p-2 pr-3 text-black"
              onInput={(e) => handleSearch(e.target.value)}
            />
            <IconButton color="black" >
            <SearchIcon />
            </IconButton>
          </Box>
          <IconButton
            color="black"
            aria-label="back"
            edge="start"
            onClick={handleBackButton}
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
        >
          {drawer}
        </Drawer>
      </Box>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Are you sure you want to delete your account? "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Once your account is deleted, all your data will be permanently
            lost, and you will not be able to recover it or access any of your
            previous activities. This action cannot be undone, and you will have
            to create a new account if you wish to use our services again.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Delete</Button>
          <Button onClick={handleClose}>Undo</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}


ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
  handleSearch: PropTypes.func.isRequired,
};

export default ResponsiveDrawer;
