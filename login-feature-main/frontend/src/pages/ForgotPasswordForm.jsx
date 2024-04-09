import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
    padding: 0,
    background: "linear-gradient(135deg, #2c3e50 0%, #8e44ad 100%)",
  },
  card: {
    width: 400,
    padding: theme.spacing(4),
    borderRadius: 10,
    background:
      "linear-gradient(135deg, rgba(52, 152, 219, 0.3), rgba(155, 89, 182, 0.3))",
    color: "#ffffff",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "background 0.3s",
  },
  button: {
    marginTop: theme.spacing(2),
    background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
    "&:hover": {
      background: "linear-gradient(135deg, #c0392b 0%, #e74c3c 100%)",
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(2),
    textAlign: "center",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: theme.spacing(1),
  },
}));

const ForgotPasswordForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    // Validation
    if (!email || !prevPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirm new password do not match.");
      return;
    }

    // Password strength validation (You can customize this according to your requirements)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }

    // Proceed with password change request
    const newPass = {
      email,
      prevPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/forgot-password",
        newPass
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Forgot Password
          </Typography>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Old Password"
            type="password"
            fullWidth
            value={prevPassword}
            onChange={(e) => setPrevPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            margin="normal"
          />
          {error && <div className={classes.error}>{error}</div>}
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleChangePassword}
            >
              Change Password
            </Button>
          </div>
          <div style={{ marginTop: '16px', textAlign: 'center' }}>
            <Typography variant="body2">
              <Link to="/login" color="inherit">
                Sign In
              </Link>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
