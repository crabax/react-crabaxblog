import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LocalPosts from 'pages/localPosts';
import RemotePosts from 'pages/remotePosts';
import RemotePostsPlus from 'pages/remotePostsPlus';
import classes from './App.module.css';
import NavgationBar from '../Navbar';

const App = () => (
  <div className={classes.container}>
    <Router>
      <NavgationBar />
      <Switch>
        <Route path="/local" exact component={LocalPosts} />
        <Route path="/remote" component={RemotePosts} />
        <Route path="/remotePlus" component={RemotePostsPlus} />
      </Switch>
    </Router>
  </div>
);

export default App;
