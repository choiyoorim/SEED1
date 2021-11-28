import React, { Component, useState } from 'react';
import './MemberInfo.css';
import Axios from 'axios';

function MemberInfo(){
    const localUserID = localStorage.getItem('userID');
    const localUsername = localStorage.getItem('userNickname');
    // const localUserPW = localStorage.getItem('userPW');
    const localUserEmail = localStorage.getItem('userEmail');
    const localUserWebsite = localStorage.getItem('userWebsite');
    const localUserBaio = localStorage.getItem('userBaio');

    const [passwordReg, setPasswordReg] = useState('');
    const [nicknameReg, setNicknameReg] = useState(localUsername);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [websiteReg, setWebsiteReg] = useState(localUserWebsite);
    const [baioReg, setBaioReg] = useState(localUserBaio);

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
          userNickname: nicknameReg,
          userWebsite: websiteReg,
          userBaio: baioReg
        }).then((response)=>{
          console.log(response);
          if(response.data.modified){
            localStorage.setItem('userNickname', nicknameReg);
            localStorage.setItem('userWebsite', websiteReg);
            localStorage.setItem('userBaio', baioReg);
            alert('회원정보 수정 완료!');
            window.location.replace("/memberInfo");
          }
        });

    }
    return(
        <>
             <div id="space"></div>
             <p id="myInfoLogo">My Info</p>

            <div class="accountEditBox">
                <div id="profileBox">
                <p id="profileImageEdit">이미지</p>
                </div>
                <div id="accountBox">
                    <h2 id="accountId">{localUserID}</h2><br/>
                    <p id="changeImage">프로필 사진 바꾸기</p>

                    <div class="editInfoBox"> 
                        <div class="infoHeadDiv"><h3 class="editHead">닉네임</h3> </div>
                        <input class="editInputs" 
                        placeholder={localUsername}
                        onChange={(e)=>{setNicknameReg(e.target.value);}}></input><br/>
                    </div>
                    
                    <div class="editInfoBox">
                        <h3 class="editHead">사이트</h3>
                        <input class="editInputs" 
                        value={websiteReg}
                        placeholder={localUserWebsite}
                        onChange={(e)=>{setWebsiteReg(e.target.value);}}></input><br/>
                    </div>
                   
                   <div class="editInfoBox">
                        <h3 class="editHead">바이오</h3>
                        <input class="editInputs" 
                        value={baioReg}
                        placeholder={localUserBaio}
                        onChange={(e)=>{setBaioReg(e.target.value);}}></input><br/>
                   </div>

                    <div class="editInfoBox">
                        <h3 class="editHead">이메일</h3>
                        <input class="editInputs" value={localUserEmail} readOnly></input><br/>
                    </div>

                    <div class="editInfoBox">
                        <h3 class="editHead" id="비밀번호변경">비밀번호 변경</h3><br/>

                        <div id="pwInputBox">
                        <input 
                            class="editInputs"
                            type="password"  
                            onChange={(e)=>{setPasswordReg(e.target.value);}}>
                        </input>

                    <input 
                        class="editInputs"
                        id="passwordCheck1MoreInput"
                        type="password"
                        onChange={(e)=>{setPasswordCheck(e.target.value);}}
                    ></input>
                        </div>

                    </div>

                    <button class="savebtns" type="submit" onClick={modify}>저장</button>
                </div>
            </div>
        </>
    );
}

export default MemberInfo;