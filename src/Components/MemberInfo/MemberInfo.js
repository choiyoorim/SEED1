import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './MemberInfo.css';
import Navi from '../Navi';

function MemberInfo(){
    return(
        <>
            <Navi></Navi>
             <div id="space"></div>

             <div class="infoBox">
                 <p id="signupLogo">Information</p>
                <div className="infodiv">
                    <h2 class="memberinfotitle" id="idinfo">ID</h2>
                    <p className="infopara">test</p>
                    <h2 class="memberinfotitle" id="nickinfo">Nickname</h2>
                    <input id="nickmodifyinput" placeholder="Seed"></input>

                    <h2 class="memberinfotitle" id="passwordinfo">Password</h2>
                    <input type="password" placeholder="1234567" id="pwinfo"></input><br/>
                    <input id="pwcheckinfo"></input>
                    <p id="pwcheckpara">* 비밀번호가 일치하지 않습니다.</p>
                    <h2 class="memberinfotitle"  id="emailinfo">Email</h2>
                    <p class="infopara" id="emailtitle">test@gmail.com</p>

                    <br/>
                </div><br/>
                <button class="savebtns">save</button>
             </div>
        </>
    );
}

export default MemberInfo; 