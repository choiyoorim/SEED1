import React, { Component, useEffect, useState }from "react";
import Axios from 'axios';
import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import user from '../../Components/Movie_poster/movie1.png';
import CategoryReviewList from './CategoryReviewList';

function Mypage(){
    const name = localStorage.getItem('userNickname');


    return (
        <section id="mypageSection" >
            <div className="setting">
                <span>
                    <img id = "mypage_user_img" src={user} width="50" height="50"/>
                </span>
                <span id="mypage_username">{name}</span>
                <div className="setting-block">
                    <span id="mypage_total">Total <span>187</span></span>
                    <span id="mypage_today">Today <span>5</span></span>
                </div>
                
            </div>

            <div className="popularSeeds">
            <h3>인기 글</h3>
                <div className="PSeedsContainer">
                    <div id="PSElement"></div>
                    <div id="PSElement"></div>
                    <div id="PSElement"></div>
                    <div id="PSElement"></div>
                    <div id="PSElement"></div>
                </div>
            </div>
            <CategoryReviewList/>
        </section>
    );
}

export default Mypage;

