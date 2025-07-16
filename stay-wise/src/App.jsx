import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
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
import OwnProfile from './components/OwnerProfile';
import Property from './components/myProperty';
import ViewProperty from "./components/ViewProperty";
import ThemeToggle from './components/ThemeToggle';
import SearchRooms from './components/SearchRoom';
import EditProperty from './components/EditProperty';
// import Landing from './components/Landing';
import './App.css';


function AppContent() {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location.pathname]);

  return (
    <>
      {isLoggedIn && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 999
        }}>
          <ThemeToggle />
        </div>
      )}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/customerSignup" element={<CustomerSignup />} />
        <Route path="/ownerSignup" element={<OwnerSignup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/decision" element={<Decision />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/matched" element={<Matched />} />
        <Route path="/selected" element={<Selected />} />
        <Route path="/ownprof" element={<OwnProfile />} />
        <Route path="/add-property" element={<AddYourProperty />} />
        <Route path="/my-property" element={<Property />} />
        <Route path="/property/:propertyId" element={<ViewProperty />} />
        <Route path="*" element={<LandingPage />} />
        <Route path='/search' element={<SearchRooms/>} />
        <Route path="/edit-property/:propertyId" element={<EditProperty />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
