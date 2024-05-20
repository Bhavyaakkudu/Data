

import './App.css';
import Loginpage from './Loginpage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Registration';  


function App() {
  
  return (
    <div className="App">
    
     <Router>
            <Routes>
                <Route path="/" element={<Loginpage />} />
                <Route path="/registration" element={<Registration />} />
            

            </Routes>
        </Router>
    </div>
  );
}

export default App;
