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
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Avatar from '@mui/material/CssBaseline';
import Typography from '@mui/material/CssBaseline';

const drawerWidth = 240;


function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const user = {
    name: 'Welcome there',
    photo:"https://i.pinimg.com/originals/9c/83/88/9c838839fcf2197a8d8007b27ba713a3.gif "
  };


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
  const Savepage = useNavigate()

  const goToSavePage=()=>{
    Savepage("/savepage");
  }
  
  const HomePage = useNavigate()

  const goToHomePage=()=>{
    HomePage("/homepage")
  }

  const LoginPage = useNavigate()

  const goToLoginPage=()=>{
    LoginPage("/loginpage")
  }

  const signupPage = useNavigate()

  const goToSignUpPage=()=>{
    signupPage("/signuppage")
  }

  const addPostPage = useNavigate()

  const goToaddPostPage=()=>{
    addPostPage("/add")
  }

  const MessagePage = useNavigate()

  const goToMessagePage =()=>{
    MessagePage("/messagepage")
  }


  const drawer = (
    <div>
        {/* {isAuthenticated && ( */}
        <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
          <Avatar src={user.photo} alt={user.name} />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            {user.name}
          </Typography>
        </Box>
      {/* )} */}
      <List>
        {['Home','Saved' ,'Language'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text === 'Home' ? goToHomePage : (text === 'Saved' ? goToSavePage : undefined)}>
            <ListItemIcon>
              {index % 3 === 0 ? <HomeIcon /> : (index % 3 === 1 ? < BookmarkAddedIcon/> : <LanguageIcon />)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Add yours','Messages','Call us'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={text === 'Add yours' ? goToaddPostPage : (text === 'Messages'? goToMessagePage :undefined)}>
              <ListItemIcon>
              {index % 3 === 0 ? <AddBoxIcon /> : (index % 3 === 1 ? < MessageIcon/> : <CallIcon />)}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
          {['Account', 'Log Out', 'Delete account'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 3 === 0 ? <AccountCircleIcon /> : (index % 3 === 1 ? <LogoutIcon /> : <PersonRemoveIcon />)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ display: { sm: 'none' } , backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 , mt:0 }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
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
            keepMounted: true, // Better open performance on mobile.
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', marginTop:6.5 , width: drawerWidth, },
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
