import React, { useEffect } from "react";
import "./app.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/proflie/Profile";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./context/actions/userActions";
import Register from "./pages/auth/Register";

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
          element={
            !isAuthenticated ? <Register /> : <Navigate replace to="/" />
          }
        />
        <Route
          exact
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          exact
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Login />}
        />
        {/* <Route
          exact
          path="/create/posts"
          element={!isAuthenticated ? <Login /> : <AddPosts />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
