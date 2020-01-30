import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Unauthorized from './Unauthorized';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClientItem from '../components/ClientItem';

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

export default function Clients({firebase, isAuth, client, uid}){
  console.log('client', client);
  const {firstName, lastName, phone, lent, received} = client;

  // return <div>Hola</div>;
  const classes = useStyles();
  const history = useHistory();

  // const [clients, setClients] = useState([]);
  // const url = 'https://us-central1-lenow-webwinter-266415.cloudfunctions.net/getClients';

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
  
  // useEffect(() => {
  //   getUser()
  //   .then((res) => {
  //     fetch(`${url}?uid=${res.uid}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('success!');
  //       setClients(data);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  //   })
  //   .catch(error => {
  //     console.error('Error', error);
  //   });   
  // }, []);

  if(isAuth){
    return(
      <div className="container">
        <h1>{`${firstName} ${lastName}`}</h1>
        {/* <div>
          {clients.map((client, id) => {
          return <ClientItem key={id} client={client} setClient={setClient}/>
          })}
        </div> */}
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onRegisterPayment(e)}
          >
            Register payment
          </Button>
      </div>
    );
  } else {
    return <Unauthorized/>
  }
}