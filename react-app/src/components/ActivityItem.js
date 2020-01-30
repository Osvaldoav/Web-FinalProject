import React from 'react';
import {useHistory} from 'react-router-dom';
import "./ActivityItem.css";

export default function ActivityItem({firebase, isAuth, activity, client, setActivity}){
  const {firstName} = client;
  const {type, amount} = activity;
  const history = useHistory();
  
  if(type === 'payment'){
    return(
      <div className="activityItem payment" onClick={() => {setActivity(activity); history.push('/editActivity')}}>
        <span>{`${firstName} has paid`}</span>
        <span className="amount">{`$${amount}`}</span>
      </div>
    );
  }else{
    return(
      <div className="activityItem loan" onClick={() => {setActivity(activity); history.push('/editActivity')}}>
        <span>{`${firstName} has borrowed`}</span>
        <span className="amount">{`$${amount}`}</span>
      </div>
    );
  }
}