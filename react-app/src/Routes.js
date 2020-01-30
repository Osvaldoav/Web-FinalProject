import React from "react";
import { Route, Switch} from "react-router-dom";
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import Home from './containers/Home';
import Clients from './containers/Clients';
import CreateClient from './containers/CreateClient';
import ClientInfo from './containers/ClientInfo';
import AddPayment from './containers/AddPayment';


export default function Routes({firebase, isAuth, setClient, client, uid}) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home firebase={firebase} isAuth={isAuth}/>
      </Route>

      <Route path="/clients" exact>
        <Clients firebase={firebase} isAuth={isAuth} setClient={setClient} uid={uid}/>
      </Route>

      <Route path="/createClient" exact>
        <CreateClient firebase={firebase} isAuth={isAuth} uid={uid}/>
      </Route>

      <Route path="/clientInfo" exact>
        <ClientInfo firebase={firebase} isAuth={isAuth} client={client} uid={uid}/>
      </Route>

      <Route path="/addPayment" exact>
        <AddPayment firebase={firebase} isAuth={isAuth} client={client} uid={uid}/>
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