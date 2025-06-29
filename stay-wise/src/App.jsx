import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import { Signup } from './components/SignUp';
import Decision from './components/DecisionPage';
import { Owner } from './components/OwnerPage';
import { Login } from './components/LogIn';
import Rooms from './components/Rooms';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/decision" element={<Decision />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
