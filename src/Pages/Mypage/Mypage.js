import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { IconContext } from 'react-icons';
import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import user from '../../Components/Movie_poster/movie1.png';
import {ReviewCategory} from '../reviewCategory';

function Mypage(){

    const [movieReviewList_E, setReviewList] = useState([]);

    const [categoryMenu, setCategoryMenu] = useState(false);
    const [background, setBackground] = useState();
    const [color, setColor] = useState();
    const openCategory = () => {
        setCategoryMenu(true);
        setBackground('var(--seed-yelow)');
        setColor('var(--seed-text-black)')
    }
    const closeCategory = () => {
        setCategoryMenu(false);
        setBackground();
        setColor();
    }

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
    }

  

    return (
        <section id="mypageSection" onClick={closeCategory}>
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

            <div className="user_write">
                <h3 onMouseOver={openCategory} style={{background: background, color: color}}>Seeds</h3>
                <ul className={categoryMenu ? 'category active' : 'category'}>
                    <li className="category-text">최신 글</li>
                    {ReviewCategory.map((item, index)=>{
                        return (
                            <li className={item.cName}>
                                {item.title}
                            </li>
                        );
                    })}
                </ul>
                <div className="write_info">
                    <div className="myseeds">
                        <span id="Wmovie">영화</span>
                        <span id="Wtitle">글 제목</span>
                        <span id="Wnum">조회수</span>
                        <span id="Wdate">작성일</span>
                    </div>
                    <form id="written">
                        <ul>
                    {movieReviewList_E.map((list) => {
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

