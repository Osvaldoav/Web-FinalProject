import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Unauthorized from './Unauthorized';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClientItem from '../components/ClientItem';
import Avatar from '@material-ui/core/Avatar';
import AttachMoney from '@material-ui/icons/AttachMoney';
import MoneyOff from '@material-ui/icons/MoneyOff';
import ActivityItem from '../components/ActivityItem';
import "./ClientInfo.css";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Clients({firebase, isAuth, client, uid, setActivityFinal}){
  console.log('client', client);
  const {firstName, lastName, phone, lent, received} = client;

  // return <div>Hola</div>;
  const classes = useStyles();
  const history = useHistory();

  const [activity, setActivity] = useState([]);
  const url = 'https://us-central1-lenow-webwinter-266415.cloudfunctions.net/getClientActivity';

  // function timeout(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // async function getUser(){
  //   const auth = firebase.auth();
  //   await timeout(1000);
  //   return auth.currentUser;
  // }

  const onRegisterPayment = () => {
    history.push('/addPayment');
  };

  const onAddLoan = () => {
    history.push('/addLoan');
  };
  
  useEffect(() => {
    fetch(`${url}?uid=${uid}&clientUid=${client.uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log('success!');
      setActivity(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }, []);

  if(isAuth){
    return(
      <div className="container">
        <h1>{`${firstName} ${lastName}`}</h1>
        <div className="clientInfo">
          <div className="clientOwes">
            {'Owes:'}
            <MoneyOff/>
            {lent}
          </div>
          <div className="clientPaid">
            {'Has paid:'}
            <AttachMoney/>
            {received}
          </div>
        </div>
        <div className="recentActivity">
          Recent Activity
        </div>
        <div>
          {activity.map((act, id) => {
            return <ActivityItem key={id} activity={act} client={client} setActivity={setActivityFinal}/>
          })}
        </div>
        <div className="buttonContainer">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onRegisterPayment(e)}
          >
            Register payment
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onAddLoan(e)}
          >
            Add loan
          </Button>
        </div>
       
      </div>
    );
  } else {
    return <Unauthorized/>
  }
}