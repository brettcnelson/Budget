import React from 'react';
import Nav from './Nav';
import Home from './Home';
import List from './List';
import { Switch,Route } from 'react-router-dom';

const App = () => (
  <div>
    <Nav />
    <main>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/list' component={List}/>
      </Switch>
    </main>
  </div>
)

export default App;
