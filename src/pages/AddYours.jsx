import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '../Components/Drawer';
import Addpost from "../Components/Addpost";
import Cookies from 'js-cookie';

function AddYours() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Logic to determine if the user is authenticated
    const authStatus = Cookies.get('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);

    if (!authStatus) {
      navigate('/Loginpage'); // Redirect to login page if not authenticated
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null; // Render nothing or a loader while redirecting
  }

  return (
    <div>
      <Drawer isAuthenticated={isAuthenticated} />
      <Addpost />
    </div>
  );
}

export default AddYours;
