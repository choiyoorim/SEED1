import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings } from "react-icons/fi";
import { IconContext } from 'react-icons';
import  '../Mypage/Mypage.css';
import user from '../../Components/Movie_poster/movie1.png';
import Navi from '../../Components/Navi';

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
                <div class="user_write">
                    <h3>내 Seeds</h3>
                    <div className="write_info">
                        <span id="movie">영화</span><span id="title">글 제목</span><span id="num">조회수</span><span id="date">작성일</span>
                    </div>
                    <form id="written">
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </form>
                </div>
            </section>
       );
    }
}

export default Mypage;

   