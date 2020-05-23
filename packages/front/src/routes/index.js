import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Router from './Router';
import Route from './Route';

import Home from '../pages/Home';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Router />
      </Switch>
    </BrowserRouter>
  );
};
