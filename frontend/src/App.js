import React from "react";
import Signup from "./pages/auth/signup/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
