import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../SignUp/Signup.css';
import googleIcon from '../../Components/img/googleLogin.png';

function SignUp(){
       return (
            <container>
                <div id="space"></div>
                <div class="signupBox">
                    <p id="signupLogo">Sign Up</p>
                    <form class="inputField">
                        <p id="idpara"> · 아이디</p>
                        <input id="input-type" type="text" placeholder="id"/><br/>
                        <p id="pwpara">· 패스워드</p>
                        <input type="password" id="input-type" placeholder="password" /><br/>
                        <input type="password" id="input-type" placeholder="password check" />
                        <p id="checkpara"> * 비밀번호가 일치하지 않습니다.</p>
                        <p id="emailpara">· 이메일</p>
                        <input type="email" id="input-type" placeholder="email" /><br/>
                        <p id="nicknamepara">· 닉네임</p>
                        <input id="input-type" placeholder="nickname" /><br/>
                        <input type="checkbox" id="policyagree" /> <span id="policypara"> SEED 정책에 동의합니다. </span><br/>
                        <button type="submit" id="signupSubmitBtn">Sign up</button>
                        <p id="orpara">─────────────　OR　─────────────</p>
                        <button id="googleSignup"><img src={googleIcon} id="googleIcon"/>Google로 회원 가입하기</button>
                        <p id="loginpara">Already have a account?<Link to="/login"><b id="gologin">　Log in</b></Link></p>
                        {/* <p class="headLine">ID   </p>
                        <input name="id" type="text" id="id"/><br/>
                        <p class="headLine">PW</p>
                        <input name="password" type="password" id="password"></input><br/>
                        <p class="headLine">PW Check</p>
                        <input name="passwordCheck" type="password" id="passwordCheck"></input><br/>
                        <p class="headLine" id="nicknameHl">Nickname</p>
                        <input name="nickname" type="text" id="nickname"></input><br/>
                        <input name="policyAgree" type="checkbox" name="policyAgree" value="agree"></input> <p id="policyPara">I Agree the SEED policy.</p><br/>
                        <button type="submit" id="signUpBtn">Sign Up</button> */}
                    </form>
                </div>
            </container>
       );
     }

   export default SignUp;