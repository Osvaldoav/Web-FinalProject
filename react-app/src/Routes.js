import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = require('./firebaseConfig.json');
firebase.initializeApp(firebaseConfig);

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact>
        <SignUp firebase={firebase}/>
      </Route>
      <Route path="/sigin" exact>
        <Home/>
      </Route>
      <Route path="/signup" exact>
        <SignIn firebase={firebase}/>
      </Route>
    </Switch>
  );
}