import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import { jwtDecode } from 'jwt-decode';


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);

      setUser(decoded);
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <div id="app">
      <h1>Welcome to the Website</h1>
      <nav>
        {!user ? (
          <React.Fragment>
            <Link to="/register">Register</Link>  <Link to="/login">Login</Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/profile">Profile</Link><button onClick={handleLogout}>Logout</button>
          </React.Fragment>
        )}
      </nav>
      <hr />
      <Routes>
        <Route path="/" element={<p>Choose an option above.</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <p>Please login first</p>} />
      </Routes>
    </div>
  );
}

export default App;
