import React from 'react';
import {useHistory} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import AttachMoney from '@material-ui/icons/AttachMoney';
import MoneyOff from '@material-ui/icons/MoneyOff';
import './ClientItem.css';

export default function Home({client, setClient}){
  const {firstName, lastName, phone, lent, received, uid} = client;
  const history = useHistory();
  
  return (
    <div className="clientItem" onClick={() => {setClient(client); history.push('/clientInfo')}}>
      <div className="clientHeader">
        <div className="clientProfile">
          <Avatar>{`${firstName[0]}${lastName[0]}`}</Avatar>
          <span className="clientName">{`${firstName} ${lastName}`}</span>
        </div>
        <div className="clientPhone">{`Cel: ${phone}`}</div>
      </div>
      <div className="clientBody">
        <div className="clientOwes">
          <MoneyOff/>
          {lent}
        </div>
        <div className="clientPaid">
          <AttachMoney/>
          {received}
        </div>
      </div>
    </div>
  );
}