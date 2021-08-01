import React, { Component, useState, useEffect, axios } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Navi from '../Navi';
import googleLogin from '../img/googleLogin.png';
import GoogleLogin from 'react-google-login';
// import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const clientId = "484363294915-vu6epkb294hkoah6l9568t34non7of4s.apps.googleusercontent.com";

function Login(onSocial) {

    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }

    const handleInputPw = (e) =>{
        setInputPw(e.target.value)
    }

    const onClickLogin = () =>{
        console.log('Login button clicked')
    }

    // useEffect(() => {
    //     axios.get('/')
    // })

    const onSuccess = async(response) => {
        console.log(response);
        const {googleId, profileObj : {email, name} } = response;
        console.log(response.profileObj);
        console.log(googleId);

    }

    const onFailure = (error) => {
        console.log(error);
    }

    return (
           <>
           <Navi></Navi>
           <div id="space"/>
            <div class="loginBox">
                <p id="loginLogo">Login</p>
                <form class="inputField">
                    <input type="text" id="id_login" onChange={handleInputId} placeholder='id'></input><br/>
                    <input type="password" id="password_login" onChange={handleInputPw} placeholder='password'/><br/>
                    <Link to="#"><button id="enterBtn" onClick={onClickLogin}>Login</button></Link><br/>
                    <Link to="/find"><p id='findId'>Forget Password?</p></Link><span id='divpara'>　·　</span><Link to="signup"><p id="signuppara">Sign up</p></Link>
                    <p id="divPara">─────────────　OR　─────────────</p>
                    <button id="googleLogin"><img id="googleIcon" src={googleLogin}></img>Google로 로그인하기</button>
                    {/* <p id="joinMsg">Not Member yet? <Link to="/signup"><p id="joinPara"> JOIN</p></Link></p> */}
                    
                    <div className="googleLoginDiv">

                    <GoogleLogin 
                        id="loginToGoogleBtn"
                        clientId = {clientId}
                        responseType={"id_token"}
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        buttonText="Google로 로그인하기"
                        />
                    </div>
                </form>
            </div>
            </>
       );
     }

   export default Login;