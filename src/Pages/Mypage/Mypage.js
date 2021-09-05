import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { IconContext } from 'react-icons';
import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import user from '../../Components/Movie_poster/movie1.png';

function Mypage(){

    const [movieReviewList, setReviewList] = useState([]);
    const id= localStorage.getItem('userID');
    const name = localStorage.getItem('userNickname');

  
    useEffect(()=>{
      Axios.post("http://localhost:3002/reviewE/list", {
          userID: id
        }).then((response)=>{
        setReviewList(response.data);
        //console.log(response);
      });
    }, []);

    const edit=(res)=>{
        localStorage.setItem('reviewID', res);
        localStorage.setItem('edit', true);
        window.location.replace("/write");

    //     Axios.post("http://localhost:3002/reviewE/edit", {
    //         userID: id, 
    //         reviewID: reviewID
    //     }).then((response)=>{
    //     console.log(response);
    //   });
    }

  

    return (
        <section id="mypageSection">
            <div className="setting">
                <span>
                    <img id = "mypage_user_img" src={user} width="50" height="50"/>
                </span>
                <span id="mypage_username">{name}</span>
                <span id="mypage_total">Total <span>187</span></span>
                <span id="mypage_today">Today <span>5</span></span>
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

            <div className="user_write">
            <h3>Seeds</h3>
                <div className="write_info">
                    <div className="myseeds">
                        <span id="Wmovie">영화</span>
                        <span id="Wtitle">글 제목</span>
                        <span id="Wnum">조회수</span>
                        <span id="Wdate">작성일</span>
                    </div>
                    <form id="written">
                        <ul>
                    {movieReviewList.map((list) => {
                        return (
                        <li className={list.reviewID} onClick={() => edit(list.reviewID)}>
                            <span id="Wmovie">{list.title}</span>
                            <span id="Wtitle">{list.reviewTitle}</span>
                            <span id="Wnum">{list.viewCount}</span>
                            <span id="Wdate">{list.preparationDate}</span>
                        </li>
                    ) })}
                        </ul>
                        </form>
                    </div>
                </div>
            
        </section>
    );
}

export default Mypage;

