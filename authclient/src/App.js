import React, { Component } from "react";
import { Route, withRouter, NavLink } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import Home from "./components/Home";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Authentication Sprint Challenge</h1>
          <nav className="main-nav">
            <NavLink className="app-link" to="/" exact>
              Home
            </NavLink>
            &nbsp;&nbsp;
            <NavLink className="app-link" to="/" exact>
              Jokes
            </NavLink>
            &nbsp;&nbsp;
            <NavLink
              onClick={this.logout}
              className="app-link"
              to="/signin"
              exact
            >
              Log Out
            </NavLink>
          </nav>
        </header>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
