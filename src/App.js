import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './pages/Coverpage.jsx';
import Homepage from './pages/Homepage.jsx';
import Savepage from './pages/Savepage.jsx';
import { DataProvider } from './Components/contacts/store';
import Login from './Components/Login';
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

function App() {
  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);
  
  return (
    <div className="App"> 
    
    <BrowserRouter>
      <DataProvider>
        <Routes>
          {/* <Route path='/' element={<Coverpage/>}/> */}
          <Route path='/' element={<Homepage/>}/>
          <Route path='/savepage' element={<Savepage/>}/>
          <Route path='/add' element={<Addpost/>}/>
          <Route path='/houseware' element= {<Houseware/>}/>
          <Route path='/officeware' element= {<Officeware/>}/>
          <Route path='/electronics' element= {<Electronics/>}/>
          <Route path='/furniture' element= {<Furniture/>}/>
          <Route path='/carAccessories' element= {<CarAccessories/>}/>
          <Route path='/books' element= {<Books/>}/>
          <Route path='/antiques' element= {<Antiques/>}/>
          <Route path='/electricalDevices' element= {<ElectricalDevices/>}/>


          
          <Route path='/loginpage'
          showError={updateErrorMessage}
          updateTitle={updateTitle}
          element={<Login/>}/>
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
        </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
