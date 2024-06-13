import './App.css';
// import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './Components/Coverpage';
import Homepage from './Components/Homepage';
import Savepage from './Components/Savepage';
import { DataProvider } from './Components/contacts/store';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route path='/' element={<Coverpage/>}/>
            <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/savepage' element={<Savepage/>}/>
        </Routes>
        </DataProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
