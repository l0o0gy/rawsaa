import './App.css';
// import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './Components/Coverpage';
import Homepage from './Components/Homepage';
import Savepage from './Components/Savepage';
import { DataProvider } from './Components/contacts/store';
import Login from './Components/Login';
import Singup from './Components/Signup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path='/' element={<Coverpage/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/savepage' element={<Savepage/>}/>
          <Route path='/loginpage' element={<Login/>}/>
          <Route path='/signuppage' element={<Singup/>}/>
        </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
