import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/HomePage';
import Profile from './components/Profile';
import LandingPage from './components/LandingPage';
import { CustomerSignup } from './components/customerSignUp';
import { OwnerSignup } from './components/ownerSignup';
import Decision from './components/DecisionPage';
import Owner from './components/OwnerPage';
import { Login } from './components/LogIn';
import Rooms from './components/Rooms';
import Matched from './components/MatchedRoom';
import Selected from './components/SelectedRoom';
import AddYourProperty from './components/AddYourProperty';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />
        <Route path="/ownerSignup" element={<OwnerSignup />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/decision" element={<Decision />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/matched" element={<Matched/>}/>
        <Route path="/selected" element={<Selected/>}/>
        <Route path="/ownprof" element={<OwnProfile/>}/>
        <Route path="*" element={<LandingPage />} />
        <Route path="/add-property" element={<AddYourProperty />} />
      </Routes>
    </Router>
  );
}

export default App;
