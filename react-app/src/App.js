import React, {useState} from 'react';
import './App.css';
import { Link } from "react-router-dom";
import Routes from './Routes';
import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = require('./firebaseConfig.json');
firebase.initializeApp(firebaseConfig);

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  firebase.auth().onAuthStateChanged(function(usr) {
    if (usr) {
      userHasAuthenticated(true);
      console.log('user is logged in');
    } else {
      userHasAuthenticated(false);
      console.log('user has logged out');
    }
  });

  const handleLogout = () => {
    firebase.auth().signOut().then(function() {
      console.log('logout succed');
    }).catch(function(error) {
      console.log('logout failed');
    });
  };


  const renderNavBar = () => {
    if(!isAuthenticated){
      return(
        <div className="navbar notLoggedIn">
          <Link to="/signin" className="navItem">Sign In</Link>
          <Link to="/signup" className="navItem">Sign Up</Link>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <div className="navLeft">
            <Link to="/" className="navItem">Home</Link>
            <Link to="/control" className="navItem">Control</Link>
            <Link to="/clients" className="navItem">Clients</Link>
            <Link to="/loans" className="navItem">Loans</Link>
          </div>
          <div className="navRight">
            <Link to="/" className="navItem" onClick={() => handleLogout()}>Log out</Link>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      {renderNavBar()}
      <div className="body">
        <Routes isAuth={isAuthenticated} firebase={firebase}/>
      </div>
    </div>
  );
}

export default App;
