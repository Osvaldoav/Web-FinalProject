import React from 'react';
import Unauthorized from './Unauthorized';

export default function Home({firebase, isAuth}){
  if(isAuth){
    return(
      <div>Home</div>
    );
  } else {
    return <Unauthorized/>
  }
}