import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './Signup.css';
import googleIcon from '../../Components/img/googleLogin.png';
import e from 'cors';
import { registerUser } from '../../_actions/userAction';

function Signup(){
    const [idReg, setIdReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [emailReg, setEmailReg] = useState('')
    const [nicknameReg, setNicknameReg] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')
    const [policyagree, setPolicyagree] = useState(false);
    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();

        // 유효성 검사
        const eng_check = /^[a-z]+[a-z0-9]{3,15}$/g;
        if(!eng_check.test(idReg)){
            return alert('아이디는 4자 이상 15자 이하의 영문자여야 합니다.')
        }

        const password_check = /^[a-z0-9]{3,19}$/g;
        if(!password_check.test(passwordReg)){
            return alert('비밀번호는 4자 이상 20자 이하여야 합니다.')
        }else if(passwordReg !== passwordCheck){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!emailReg.match(email_check)){
            return alert('올바른 이메일 형식을 입력하세요.');
        }

        if(nicknameReg.length === 0 || nicknameReg.length < 2){
            return alert('이름은 2글자 이상이어야 합니다.');
        }

        if(policyagree === false){
            return alert('SEED 정책에 동의하셔야 합니다.');
        }

        let body = {
            userID: idReg, 
            userPW: passwordReg,
            userEmail: emailReg,
            userNickname: nicknameReg
        };
        dispatch(registerUser(body)).then((res) =>{
            alert("가입이 정상적으로 완료되었습니다.");
            
        })
        Axios.post('http://localhost:3002/register', {
          userID: idReg, 
          userPW: passwordReg,
          userEmail: emailReg,
          userNickname: nicknameReg
        }).then((response)=>{
          console.log(response);
          if(response.data.signed){
            alert('회원 가입 완료!');
            window.location.replace("/login");
          }
        });
      };

    return (
         <container>
             <div id="space"></div>
 
             <div className="signupBox">
                 <p id="signupLogo">Sign Up</p>
                 <form className="inputField">
                     <p id="idpara">· ID</p>
                     <input 
                        id="input-type" 
                        type="text" 
                        placeholder="id"
                        onChange={(e) =>{
                            setIdReg(e.target.value);
                        }}
                     /><br/>

                     <p id="pwpara">· Password</p>
                     <input 
                        type="password" 
                        id="input-type" 
                        placeholder="password" 
                        onChange={(e)=>{
                            setPasswordReg(e.target.value);
                        }}
                    /><br/>
                     <input type="password" 
                        id="input-type" 
                        placeholder="password check"
                        onChange={(e) =>{
                            setPasswordCheck(e.target.value);
                        }}   
                    />
                     {/* <p id="checkpara"> * 비밀번호가 일치하지 않습니다.</p> */}

                     <p id="emailpara">· Email</p>
                     <input 
                        type="email" 
                        id="input-type" 
                        placeholder="email" 
                        onChange={(e)=>{
                            setEmailReg(e.target.value);
                        }}
                    /><br/>

                     <p id="nicknamepara">· Nickname</p>
                     <input 
                        id="input-type" 
                        placeholder="nickname" 
                        onChange={(e)=>{
                            setNicknameReg(e.target.value);
                        }}
                    /><br/>

                    <input type="checkbox" 
                        onClick={(e)=>{
                            setPolicyagree(e.target.value);
                        }}
                        id="policyagree" 
                    /> <span id="policypara"> SEED 정책에 동의합니다. </span><br/>

                     <button 
                        type="submit" 
                        id="signupSubmitBtn" 
                        onClick={register}>Sign up</button>
                     <p id="orpara">─────────────　OR　─────────────</p>
                     <button id="googleSignup"><img src={googleIcon} id="googleIcon"/>Google로 회원 가입하기</button>
                     <p id="loginpara">Already have a account?<Link to="/login"><b id="gologin">　Log in</b></Link></p>
                 </form>
             </div>
         </container>
    );
  }

   export default Signup;