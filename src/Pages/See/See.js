import React from 'react';
import Navi from '../../Components/Navi'
import './See.css'
import {Link} from 'react-router-dom';

function See(){
  return(
    <>
        <p className = 'button'>
            <Link to='/shortwrite'>write</Link>
        </p>
    </>
  )
}

export default See;