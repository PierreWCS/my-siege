import React from 'react';
import './App.css';
import R6stats from "./components/R6stats";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import OperatorStats from "./components/OperatorsStats";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/stats" component={R6stats}/>
          <Route path="/operators" component={OperatorStats}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
