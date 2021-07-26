import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { IconContext } from 'react-icons';
import './../../Components/color.css'
import  '../Mypage/Mypage.css';
import user from '../../Components/Movie_poster/movie1.png';

var db = require
class Mypage extends Component {
    render(){
       return (
            <section>
                <div class="setting">
                    <span>
                        <img id = "mypage_user_img" src={user} width="50" height="50"/>
                    </span>
                    <span id="mypage_username">닉네임</span>
                    {/* 설정 버튼 Link태그로 회원 정보 수정 페이지로 이동해야한다. */}
                    <Link to="#" className="setting_icon">
                        <FiSettings color= 'var(--seed-yelow)' size ='25px'/>
                    </Link>
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

                <div class="user_write">
                <h3>Seeds</h3>
                    <div className="write_info">
                        <div className="myseeds">
                            <span id="Wmovie">영화</span><span id="Wtitle">글 제목</span><span id="Wnum">조회수</span><span id="Wdate">작성일</span>
                        </div>
                        <form id="written">
                        <ul>
                            <li><span id="Wmovie">영화 이름</span><span id="Wtitle"> 제목1</span><span id="Wnum">3</span><span id="Wdate">2021.07.23</span></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </form>
                    </div>
                    
                </div>
            </section>
       );
    }
}

export default Mypage;

   