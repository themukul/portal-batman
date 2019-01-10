import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/materials" exact component={Dashboard} />
          <Route path="/payments" exact component={Dashboard} />
          <Route path="/news" exact component={Dashboard} />
          <Route path="/btp" exact component={Dashboard} />
          <Route path="/ta" exact component={Dashboard} />
        </div>
      </Router>
    );
  }
}

export default App;
