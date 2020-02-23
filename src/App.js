import React from 'react';
import './App.css';
import R6stats from "./components/R6stats";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={R6stats}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
