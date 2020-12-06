import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import NavBar from "./components/NavBar";

const HomePage = () => (
  <div>
    <h1>HOME</h1>
  </div>
);

const CharaPage = () => (
  <div>
    <h1>CHARACTERS</h1>
  </div>
);

function App() {
  return (
    <div className="App">
      <NavBar />
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/characters' component={CharaPage}/>
          <Route />
        </Switch>
    </div>
  );
}

export default App;
