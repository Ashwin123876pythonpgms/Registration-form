import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import RegistrationForm from "./pages/RegistrationForm";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      </Routes>
    </div>
  );
};

export default App;
