import React from "react";
import { Route, Switch} from "react-router-dom";
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import Clients from './containers/Clients';


export default function Routes({firebase, isAuth}) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home firebase={firebase} isAuth={isAuth}/>
      </Route>

      <Route path="/clients" exact>
        <Clients firebase={firebase} isAuth={isAuth}/>
      </Route>

      <Route path="/signin" exact>
        <SignIn firebase={firebase}/>
      </Route>

      <Route path="/signup" exact>
        <SignUp firebase={firebase}/>
      </Route>
    </Switch>
  );
}