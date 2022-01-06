import React, { Component, useState } from 'react';
import './MemberInfo.css';
import Axios from 'axios';

function MemberInfo(){
    const localUserID = localStorage.getItem('userID');
    const localUsername = localStorage.getItem('userNickname');
    // const localUserPW = localStorage.getItem('userPW');
    const localUserEmail = localStorage.getItem('userEmail');

    const [passwordReg, setPasswordReg] = useState('');
    const [nicknameReg, setNicknameReg] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    const modify = () =>{

        
        const password_check = /^[a-z0-9]{3,19}$/g;
        if(!password_check.test(passwordReg)){
            return alert('비밀번호는 4자 이상 20자 이하여야 합니다.')
        }else if(passwordReg !== passwordCheck){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        if(nicknameReg.length === 0 || nicknameReg.length < 2){
            return alert('닉네임은 2글자 이상이어야 합니다.');
        }

        Axios.post('http://localhost:3002/modify', {
          userID: localUserID,
          userPW: passwordReg,
          userNickname: nicknameReg
        }).then((response)=>{
          console.log(response);
          if(response.data.modified){
            localStorage.setItem('userNickname', nicknameReg);
            alert('회원정보 수정 완료!');
            window.location.replace("/memberInfo");
          }
        });

    }
    return(
        <>
             <div id="space"></div>
             <p id="myInfoLogo">My Info</p>

             <div class="infoBox">
                 <div id="firstTitle"><p>필수 정보</p></div>
             <div id="firstDiv">
                    <h2 id="idinfo">ID</h2>
                    <p class="infopara" id="IDpara">{localUserID}</p>
                    <br/>
                    <h2 id="nickinfo">Nickname</h2>
                    <input id="nicknameModify" 
                        placeholder={localUsername} 
                        onChange={(e)=>{setNicknameReg(e.target.value);}}>
                    </input>
                    <br/>

                    <h2 id="passwordinfo">Password</h2>
                    <input 
                        type="password"  
                        id="pwinfo"
                        onChange={(e)=>{setPasswordReg(e.target.value);}}>
                    </input><br/>

                    <input 
                        type="password"
                        id="pwcheckinfo"
                        onChange={(e)=>{setPasswordCheck(e.target.value);}}
                    ></input>

                    <br/><br/>
                    <h2 id="emailinfo">Email</h2>
                    <p class="infopara" id="emailtitle">{localUserEmail}</p>
                    <br/>
             </div>

            <div id="secondTitle"><p>추가 정보</p></div>
            <div id="secondDiv">
                    <h2 id="homepageinfo">Home page</h2>
                    <input id="homepageInput"></input>

                    <br/>
            </div>

                <button class="savebtns" type="submit" onClick={modify}>저장</button>
             </div>
        </>
    );
}

export default MemberInfo;