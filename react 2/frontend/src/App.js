import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import LogIn from './components/LogIn'
import SignUp from './components/SignUp'

function App() {
  return (
    <React.Fragment>
      <header>
        <h1> Tanda </h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LogIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
