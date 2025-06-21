import { useState } from 'react'
import { BrowserRouter as Router,Route,Routes,Link } from 'react-router-dom'
import Home from './components/HomePage'
import Profile from './components/Profile'
import LandingPage from './components/LandingPage'
import {Signup} from './components/SignUp'
import Decision from './components/DecisionPage'
import { Owner } from './components/OwnerPage'
import './App.css'
import { Login } from './components/LogIn'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='*' element={<LandingPage/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="decision" element={<Decision/>}/>
          <Route path="/owner" element={<Owner/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
