import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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

export default function CreateClient({firebase, isAuth, uid}) {
  const history = useHistory();
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const url = 'https://us-central1-lenow-webwinter-266415.cloudfunctions.net/createClient';

  async function getUser(){
    return await firebase.auth().currentUser;
  }

  const onAddClient = (e) => {
    e.preventDefault();
    if(firstName === '' || lastName === '' || phone === '')
      setErrorMessage('You must provide all required information.');
    else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({firstName, lastName, phone, uid})
      })
      .then((data) => {
        console.log('success!', data);
        setErrorMessage('');
        history.push('/clients');
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } 
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a new client
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="phone"
            label="Phone number"
            name="phone"
            autoComplete="phone"
            placeholder="(425) 1425 123"
            autoFocus
            onChange={e => setPhone(e.target.value)}
          />
          <Grid container>
            <Grid item style={{color: '#E80000'}}>
              {errorMessage}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onAddClient(e)}
          >
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}