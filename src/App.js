import './App.css';
// import Navbar from './Components/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Coverpage from './Components/Coverpage';
import Homepage from './Components/Homepage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Coverpage/>}/>
          <Route path='/homepage' element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
