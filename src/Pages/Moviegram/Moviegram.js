import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import  './Moviegram.css';


function Moviegram(){
    const name = localStorage.getItem('userNickname');


    return (
        <div id="moviegramBack">
            <div id="profileImage"> </div>
            <span id="profileNickname">{name}</span><br/>
            <span id="profileInfor">한 줄 소개</span>

            <div id="MoviegramContainer">
               
            </div>
        </div>
    );
}

export default Moviegram;