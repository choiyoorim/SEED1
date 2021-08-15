import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import './Login.css';
import googleLogin from '../img/googleLogin.png';
import {withRouter} from 'react-router-dom';

function Login() {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");

    Axios.defaults.withCredentials = true;

    const login = () => {
        //e.preventDefault();

        Axios.post('http://localhost:3002/user/login', {
          userID: id, 
          userPW: password,
        }).then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)
            }else{
                localStorage.setItem('userID', response.data[0].userID)
                localStorage.setItem('userEmail', response.data[0].userEmail)
                localStorage.setItem('userNickname', response.data[0].userNickname)

                setLoginStatus(response.data[0].userNickname)

                window.location.replace("/see")
                //history.push('/see');
            }
        });
    };

    useEffect(()=>{
    Axios.get("http://localhost:3002/login").then((response)=>{
        if(response.data.loggedIn == true){
            setLoginStatus(response.data.user[0].userNickname);
        }
    });
    }, []);
    
    return (
        <>
        <div id="space"/>
        <div className="loginBox">
        <Link to="/"><button id="backBtn">back</button></Link>
            <p id="loginLogo">Login</p>
            <form className="inputField">
                <input type="text" 
                    id="id_login" 
                    placeholder='id' 
                    name='inputID' 
                    onChange={(e) =>{
                        setId(e.target.value);
                    }}
                />
                <br/>
                <input type="password" 
                    id="password_login" 
                    placeholder='password' 
                    name='inputPW' 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
                <br/>
                <Link to="#"><button id="enterBtn" onClick={login}>Login</button></Link><br/>
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