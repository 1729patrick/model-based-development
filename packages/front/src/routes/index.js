import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Route from './Route';

import Albums from '../pages/Albums';
import Artists from '../pages/Artists';
import Genres from '../pages/Genres';
import Songs from '../pages/Songs';
import Home from '../pages/Home';

export default () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route exact path="/albums" component={Albums}></Route>
        <Route exact path="/artists" component={Artists}></Route>
        <Route exact path="/genres" component={Genres}></Route>
        <Route exact path="/songs" component={Songs}></Route>
      </Switch>
    </BrowserRouter>
  );
};
