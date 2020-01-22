import React from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function Main () {
  return (
    <Router>
      <Redirect to='/posts/list'></Redirect>
      <Route path="/posts/" component={Home} />
      <Route path="/login/" component={Login} />
    </Router>
  )
}

export default Main;
