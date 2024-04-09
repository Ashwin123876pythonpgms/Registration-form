import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'
import { makeStyles } from "@mui/styles";
import {
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

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
  loginText: {
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
  textItem: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  }
}));

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const {userEmail , userName} = jwtDecode(localStorage.getItem('token'))

  const handleSignOut = () => {
    // Clear user tokens
    localStorage.removeItem("jwtToken"); // Adjust the key as needed
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login"); // Adjust the route path
  };

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.loginText}>
            {`Welcome Back ${userName}!`}
          </Typography>
          <Typography variant="h6" component="div" className={classes.textItem}>{`Username :  ${userName}`}</Typography>
          <Typography variant="h6" component="div" className={classes.textItem}>{`Email :  ${userEmail}`}</Typography>
          {isLoggedIn && <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </div>}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
