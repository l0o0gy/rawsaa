import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Drawer from '../Components/Drawer';
import Cookies from 'js-cookie';

function Savepage() {
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
    <div className='text-center h-screen'>
      <Navbar />
      <Drawer isAuthenticated={isAuthenticated} />
      <div className="text-center bg-red-500 sm:ml-64 sm:mt-10">
        <h1>Savepage</h1>
      </div>
    </div>
  );
}

export default Savepage;
