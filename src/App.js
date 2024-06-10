import './App.css';
// import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './Components/Coverpage';
import Homepage from './Components/Homepage';
import Savepage from './Components/Savepage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Coverpage/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
          <Route path='/savepage' element={<Savepage/>}/>

        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
