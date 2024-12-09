import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setCurrentUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = new URLSearchParams();
      data.append('email', username);
      data.append('password', password);

      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });

      if (response.ok) {
        const user = await response.json();
        const userRole = user.is_admin ? 'admin' : 'user';
        setCurrentUser(userRole);
        localStorage.setItem('currentUser', JSON.stringify(userRole)); // Save to local storage
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div style={styles.formGroup}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '1rem',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
};

export default Login;
