import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import PostsFeed from '../../pages/PostsFeed';

const index = () => {
    return (
    <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/profile:id' exact component={Profile} />
          <Route path='/postsfeed' exact component={PostsFeed} />
          <Redirect to='/' />
        </Switch>
      </Router>
    );
};

export default index;