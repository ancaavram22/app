import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// components
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Profile from './components/Profile';
import Register from './components/Register';
import Chemistry from './courses/Chemistry';
import English from './courses/English';
import Grammar from './courses/Grammar';
import Math from './courses/Math';
import Physics from './courses/Physics';
import Programming from './courses/Programming';

function App() {
  return (
    <Router>
      {/* <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
      </Routes> */}
      <Routes>
        <Route path="/chemistry" element={<Chemistry />} />
        <Route path="/english" element={<English />} />
        <Route path="/grammar" element={<Grammar />} />
        <Route path="/math" element={<Math />} />
        <Route path="/physics" element={<Physics />} />
        <Route path="/programming" element={<Programming />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
