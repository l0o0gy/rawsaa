import * as React from 'react';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './pages/Coverpage.jsx';
import Homepage from './pages/Homepage.jsx';
import Savepage from './pages/Savepage.jsx';
import { DataProvider } from './Components/contacts/store';
import Login from './Components/Login.jsx';
import Singup from './Components/Signup';
// import Header from './Components/Header';
import AlertComponent from './Components/AlertComponent.jsx';
// import PrivateRoute from './utils/PrivateRoute';
import { useState } from 'react';
import Addpost from './Components/Addpost.jsx';
import Houseware from './pages/Houseware.jsx';
import Officeware from './pages/Officeware.jsx'
import Electronics from './pages/Electronics.jsx'
import Furniture from './pages/Furniture.jsx'
import CarAccessories from './pages/CarAccessories.jsx'
import Books from './pages/Books.jsx'
import Antiques from './pages/Antiques.jsx'
import ElectricalDevices from './pages/ElectricalDevices.jsx'
import PostHistory from './pages/PostHistory.jsx';
import ResponsiveDrawer from './Components/Drawer.jsx';
import LoginFinal from './Components/Login.jsx';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import PostPage from './pages/PostPage.jsx';
import Account from './pages/Account.jsx';


function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get the authentication status from cookies
    const authStatus = Cookies.get('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <div className="App"> 
    <BrowserRouter>
      <DataProvider>
      <ResponsiveDrawer isAuthenticated={isAuthenticated} />
        <Routes>
          {/* <Route path='/' element={<Coverpage/>}/> */}
          <Route path='/' element={<Homepage isAuthenticated={isAuthenticated}/>}/>
          <Route path='/savepage' element={<Savepage/>}/>
          <Route path='/history' element={<PostHistory />}/>
          <Route path='/houseware' element= {<Houseware/>}/>
          <Route path='/officeware' element= {<Officeware/>}/>
          <Route path='/electronics' element= {<Electronics/>}/>
          <Route path='/furniture' element= {<Furniture/>}/>
          <Route path='/carAccessories' element= {<CarAccessories/>}/>
          <Route path='/books' element= {<Books/>}/>
          <Route path='/antiques' element= {<Antiques/>}/>
          <Route path='/electricalDevices' element= {<ElectricalDevices/>}/>
          <Route path="/accountpage" element={<Account/>}/>
          <Route path="/loginpage" element={<LoginFinal  />} showError={updateErrorMessage}
          updateTitle={updateTitle}/>

          <Route path='/'
          exact={true}
          showError={updateErrorMessage} updateTitle={updateTitle} element={<Singup/>}/>
          <Route path="/signuppage"
          showError={updateErrorMessage}
          updateTitle={updateTitle}
          element={<Singup/>} />
            {/* <PrivateRoute path="/homepage">
              <Homepage/>
            </PrivateRoute> */}
          < Route
          errorMessage={errorMessage}
          hideError={updateErrorMessage}
          element={<AlertComponent/>}/>
          <Route path="/posts/:postId" element={<PostPage />} />

        </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
