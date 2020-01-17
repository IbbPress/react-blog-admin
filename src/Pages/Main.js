import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

function Main () {
  return (
    <Router>
      <Route path="/index" component={Home} />
      <Route path="/login/" exact component={Login} />
    </Router>
  )
}

export default Main;
