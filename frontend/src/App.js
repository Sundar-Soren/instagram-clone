import React, { useEffect } from "react";
import "./app.css";
import Signup from "./pages/auth/signup/Signup";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/proflie/Profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./context/actions/userActions";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          exact
          path="/signup"
          element={!isAuthenticated ? <Signup /> : <Navigate replace to="/" />}
        />
        <Route
          exact
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          exact
          path="/profile"
          element={!isAuthenticated ? <Login /> : <Profile />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
