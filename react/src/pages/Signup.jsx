import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch('http://localhost:3002/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      localStorage.setItem('userId', data.insertedId);
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      
      navigate('/');
    } catch (err) {
      console.error('Signup error:', err);
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <div className="navbar-logo" style={{ position: 'absolute', top: '20px', left: '20px' }}>
        <Link to="/">👕 TCE</Link>
      </div>
      
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join our community to buy, sell, and trade clothing</p>
        
        {error && <div className="signup-error">{error}</div>}
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              required
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <a href="/login" className="login-link">Log in</a></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
