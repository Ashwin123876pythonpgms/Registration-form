import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #2c3e50 0%, #8e44ad 100%)',
  },
  card: {
    width: 400,
    padding: theme.spacing(4),
    borderRadius: 10,
    background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.3), rgba(155, 89, 182, 0.3))',
    color: '#ffffff',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    transition: 'background 0.3s',
  },
  button: {
    marginTop: theme.spacing(2),
    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    '&:hover': {
      background: 'linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)',
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: 'center',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Basic validation checks
    if (!usernameOrEmail.trim()) {
      setError("Please enter your email or username.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    // Handle login functionality
    const user = {
      usernameOrEmail,
      password
    }

    try {
      const res = await axios.post('http://localhost:4000/api/user/login', user)
      const token = res.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      navigate(`/`);
    } catch (error) {
      console.log(error);
      setError("Invalid credentials. Please try again."); // Set error message
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.loginText}>
            Login
          </Typography>
          <TextField
            label="Email or Username"
            fullWidth
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          {error && <div className={classes.error}>{error}</div>} {/* Display error message */}
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Typography variant="body2">
              <Link to="/registration" color="inherit">
                Sign Up
              </Link>
              &nbsp; | &nbsp;
              <Link to="/forgot-password" color="inherit">
                Forgot Password
              </Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
