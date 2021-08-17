import React, { Component, useEffect, useState } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import './Signup.css';
import googleIcon from '../../Components/img/googleLogin.png';

function Signup(){
    const [idReg, setIdReg] = useState('')
    const [passwordReg, setPasswordReg] = useState('')
    const [emailReg, setEmailReg] = useState('')
    const [nicknameReg, setNicknameReg] = useState('')
    

    const register = () => {
        Axios.post('http://localhost:3002/register', {
          userID: idReg, 
          userPW: passwordReg,
          userEmail: emailReg,
          userNickname: nicknameReg
        }).then((response)=>{
          console.log(response);
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
                     <input type="password" id="input-type" placeholder="password check" />
                     <p id="checkpara"> * 비밀번호가 일치하지 않습니다.</p>

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

                     <input type="checkbox" id="policyagree" /> <span id="policypara"> SEED 정책에 동의합니다. </span><br/>
                     <button type="submit" id="signupSubmitBtn" onClick={register}>Sign up</button>
                     <p id="orpara">─────────────　OR　─────────────</p>
                     <button id="googleSignup"><img src={googleIcon} id="googleIcon"/>Google로 회원 가입하기</button>
                     <p id="loginpara">Already have a account?<Link to="/login"><b id="gologin">　Log in</b></Link></p>
                 </form>
             </div>
         </container>
    );
  }

   export default Signup;