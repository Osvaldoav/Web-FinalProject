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

export default function EdictActivity({firebase, isAuth, client, uid, activity}) {
  const history = useHistory();
  const classes = useStyles();
  const [amount, setAmount] = useState(activity.amount);
  const [errorMessage, setErrorMessage] = useState('');

  const updateUrl = 'https://us-central1-lenow-webwinter-266415.cloudfunctions.net/updatePayment';
  const deleteUrl = 'https://us-central1-lenow-webwinter-266415.cloudfunctions.net/deletePayment';

  const onUpdate = (e) => {
    e.preventDefault();
    if(amount === '')
      setErrorMessage('Please provide a valid amount.');
    else {
      fetch(updateUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount, uid, actUid: activity.uid, clientUid: client.uid})
      })
      .then((data) => {
        console.log('success!', data);
        setErrorMessage('');
        history.push('/clientInfo');
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
          {`${client.firstName} ${client.lastName}`}
        </Typography>
        <div>{activity.type === 'payment' ? 'Payment' : 'Loan'}</div>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="amount"
            label="$ Amount"
            name="amount"
            autoComplete="amount"
            placeholder="5000.00"
            autoFocus
            defaultValue={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <Grid container>
            <Grid item style={{color: '#E80000'}}>
              {errorMessage}
            </Grid>
          </Grid>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              // onClick={(e) => onRegisterPayment(e)}
            >
              Delete
            </Button>

            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onUpdate(e)}
          >
            Update
          </Button>
          </div>
          
        </form>
      </div>
    </Container>
  );
}