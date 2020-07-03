import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import Songs from '../pages/Songs';
import Albums from '../pages/Albums';
import Artists from '../pages/Artists';
import Home from '../pages/Home';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route exact path="/songs" component={Songs}></Route>
        <Route exact path="/albums" component={Albums}></Route>
        <Route exact path="/artists" component={Artists}></Route>
      </Switch>
    </BrowserRouter>
  );
};
