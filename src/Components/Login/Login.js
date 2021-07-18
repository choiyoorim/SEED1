import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Navi from '../Navi';
import googleLogin from '../img/googleLogin.png';
// import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
       return (
           <>
           <Navi></Navi>
           <div id="space"/>
            <div class="loginBox">
            <Link to="/"><button id="backBtn">back</button></Link>
                <p id="loginLogo">Login</p>
                <form class="inputField">
                    <input type="text" id="id_login" placeholder='id'></input><br/>
                    <input type="password" id="password_login" placeholder='password'/><br/>
                    <Link to="#"><button id="enterBtn">Login</button></Link><br/>
                    <Link to="/find"><p id='findId'>Forget Password?</p></Link><span id='divpara'>　·　</span><Link to="signup"><p id="signuppara">Sign up</p></Link>
                    <p id="divPara">─────────────　OR　─────────────</p>
                    <button id="googleLogin"><img id="googleIcon" src={googleLogin}></img>Google로 로그인하기</button>
                    {/* <p id="joinMsg">Not Member yet? <Link to="/signup"><p id="joinPara"> JOIN</p></Link></p> */}
                </form>
            </div>
            </>
       );
     }

   export default Login;