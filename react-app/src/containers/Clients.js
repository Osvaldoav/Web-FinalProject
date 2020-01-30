import React from 'react';
import Unauthorized from './Unauthorized';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

export default function Clients({firebase, isAuth}){
  const classes = useStyles();

  const onAddClient = () => {
    
  };

  if(isAuth){
    return(
      <div className="container">
        <h1>Clients</h1>
        <div></div>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onAddClient(e)}
          >
            Add new client
          </Button>
      </div>
    );
  } else {
    return <Unauthorized/>
  }
}