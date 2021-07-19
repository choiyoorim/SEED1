import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Find.css';
import Navi from '../../Components/Navi';

function Find(){
    return(
    <>
        <div id="space"/>

        <div class="findBox">
            <p id="findLogo">Find account</p>
            <div id="innerbox">
                <div id="findid">
                    <h1 class="findtitle">아이디 찾기</h1>
                    <p class="findpara">가입 시 작성한 이메일으로 아이디를 보내드립니다.</p>
                    <input id="id_find" placeholder="email" />
                    <button id="findid_sendemail">send</button>
                </div>
                
                <p id="sepPara">───────────────────　OR　───────────────────</p>
                
                <div id="findpw">
                    <h1 class="findtitle">비밀번호 찾기</h1>
                    <p class="findpara">아이디와 비밀번호를 입력하세요.</p>
                    <input id="pw_find" placeholder="id" />
                    <button id="findpw_checkid">check</button>
                    <p id="checkidpara">존재하지 않는 아이디입니다.</p>
                    <br/>
                    <input id="findpw_email" placeholder="email"/>
                    <button id="findpw_sendemail">send</button>
                </div>
            </div>
        </div>

    </>
    );
}

export default Find;