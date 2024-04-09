import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { TextField, Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

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
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = async() => {
    // Basic validation checks
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!username.trim()) {
      setError("Please enter your username.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Handle registration functionality
    const newUser = {
      email,
      username,
      password,
      confirmPassword
    }

    try{
      const res = await axios.post('http://localhost:4000/api/user/register', newUser)
      const token = res.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      if(res.status){
        navigate('/')
      }
      console.log(res);
    }catch(error){
      console.log(error);
      setError("Registration failed. Please try again."); // Set error message
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Registration
          </Typography>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            margin="normal"
          />
          {error && <div className={classes.error}>{error}</div>} {/* Display error message */}
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleRegistration}
            >
              Register
            </Button>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Typography variant="body2">
              <Link to="/login" color="inherit">
                Sign In
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

export default RegistrationForm;
