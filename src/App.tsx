import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import NavComponent from './components/nav/nav.component';
import LoginComponent from './components/login/login.component';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <div className="App">
        <NavComponent/>
        <Switch>
          <Route path="/login" component={LoginComponent}/>
          <Route component={NotFound}/>
        </Switch>
      </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
