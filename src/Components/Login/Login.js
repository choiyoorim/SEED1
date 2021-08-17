import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import './Login.css';
import googleLogin from '../img/googleLogin.png';


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
            //console.log(response);

            if(!response.data.auth){
                setLoginStatus(response.data.message);
            }else{
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('auth', response.data.auth)
                localStorage.setItem('userID', response.data.result[0].userID)
                localStorage.setItem('userNickname', response.data.result[0].userNickname)
                localStorage.setItem('userEmail', response.data.result[0].userEmail)
                setLoginStatus(response.data.message);
                window.location.replace("/see")
                //history.push('/see');
            }
        });
    };

    // useEffect(()=>{
    // Axios.get("http://localhost:3002/user/login").then((response)=>{
    //     if(response.data.loggedIn == true){
    //         setLoginStatus(response.data.user[0].userNickname);
    //     }
    // });
    // }, []);

    //인증 JWT
    // const userAuthenticated = () =>{
    //     Axios.get("http://localhost:3002/user/isUserAuth", {
    //         headers: {
    //             "x-access-token": localStorage.getItem('token'),
    //         },
    //     }).then((response)=>{
    //         console.log(response);
    //     })
    // }
    
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
                <p id='login_status'>{loginStatus}</p>
                {/* {loginStatus && (<button onClick={userAuthenticated}>인증하세요</button>)} */}
                <p id="divPara">─────────────　OR　─────────────</p>
                <button id="googleLogin"><img id="googleIcon" src={googleLogin}></img>Google로 로그인하기</button>
                {/* <p id="joinMsg">Not Member yet? <Link to="/signup"><p id="joinPara"> JOIN</p></Link></p> */}
            </form>
        </div>
        </>
    );
}

export default Login;