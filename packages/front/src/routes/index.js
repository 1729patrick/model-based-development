import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import Home from './../pages/Home';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/about" component={Home}></Route>
      </Switch>
    </BrowserRouter>
  );
};
