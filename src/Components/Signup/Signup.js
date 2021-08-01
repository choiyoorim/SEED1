import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import Navi from '../Navi';
import googleIcon from '../img/googleLogin.png';
import axios from 'axios';

function Signup(){

    const signup = async function(){
        const id = document.getElementById('id_signup').value.trim();
        const password = document.getElementById('password_signup').value.trim();
        const pw_check = document.getElementById('passwordcheck_signup').value.trim();
        const email = document.getElementById('email_signup').value.trim();
        const nickname = document.getElementById('nickname_signup').value.trim();

        const eng_check = /^[a-z]+[a-z0-9]{3,15}$/g;
        if(!eng_check.test(id)){
            return alert('아이디는 4자 이상 15자 이하의 영문자여야 합니다.')
        }

        const password_check = /^[a-z0-9]{3,19}$/g;
        if(!password_check.test(password)){
            return alert('비밀번호는 4자 이상 20자 이하여야 합니다.')
        }else if(password !== pw_check){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        if(nickname.length === 0 || nickname.length < 2){
            return alert('이름은 2글자 이상이어야 합니다.');
        }

        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if(!email.match(email_check)){
            return alert('올바른 이메일 형식을 입력하세요.');
        }

        // front end check
        


        const data = {
            id: id,
            password: password,
            nickname: nickname,
            email: email
        };

        const add_data = await axios('/api/signup', {
            method: 'POST',
            headers: new Headerss(),
            data: data
        })

        fetch("/api/signup", {
            method: "POST",
            headers: {
                "content-type" : "application/json",
            },
            body: JSON.stringify(data)
        });

        
    }



    return (
         <container>
             <Navi></Navi>
             <div id="space"></div>

             <div class="signupBox">
                 <p id="signupLogo">Sign Up</p>
                 <form class="inputField">
                     <p id="idpara">· ID</p>
                     <input id="id_signup" type="text" placeholder="id"/><br/>
                     <p id="pwpara">· Password</p>
                     <input type="password" id="password_signup" placeholder="password" /><br/>
                     <input type="password" id="passwordcheck_signup" placeholder="password check" />
                     {/* <p id="checkpara"> * 비밀번호가 일치하지 않습니다.</p> */}
                     <p id="emailpara">· Email</p>
                     <input type="email" id="email_signup" placeholder="email" /><br/>
                     <p id="nicknamepara">· Nickname</p>
                     <input id="nickname_signup" placeholder="nickname" /><br/>
                     <input type="checkbox" id="policyagree" /> <span id="policypara"> SEED 정책에 동의합니다. </span><br/>
                     <button type="submit" id="signupSubmitBtn" onClick={signup}>Sign up</button>
                     <p id="orpara">─────────────　OR　─────────────</p>
                     <button id="googleSignup"><img src={googleIcon} id="googleIcon"/>Google로 회원 가입하기</button>
                     <p id="loginpara">Already have a account?<Link to="/login"><b id="gologin">　Log in</b></Link></p>

                 </form>
             </div>
         </container>
    );
  }

   export default Signup;