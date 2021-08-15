import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import './Signup.css';
import Navi from '../Navi';
import googleIcon from '../img/googleLogin.png';
// import axios from 'axios';

function Signup(){
    const [newMember, setNewMember] = useState({
        id:'',
        password:'',
        passwordcheck:'',
        email:'',
        nickname:'',
    });

    const { id, apssword, email, nickname } = newMember;

    const state = {
        usableId: false
    }

     const handleChange = (e) =>{

        const { value, name } = e.target;
        
          setNewMember({
              ...newMember,
              [name]: value
          });


      };

      const idCheck = (e) =>{
          e.preventDefault();
          const { usableId } = this.state;

          fetch("http://localhost:3002/join", {
              method: "POST",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                  userID: newMember.id
              })
          })
          .then(response => {
              if(response.status === 200){
                  alert("사용 가능한 아이디입니다.");
                  this.setState({
                      usable_id: true
                  })
              }else if(response.status === 409){
                  alert("사용중인 아이디입니다.");
              }else{
                  alert("사용 불가능한 아이디입니다.");
              }
          })
      }

      const onclick = (e) =>{
        e.preventDefault();

        // 유효성 검사
        const eng_check = /^[a-z]+[a-z0-9]{3,15}$/g;
        if(!eng_check.test(newMember.id)){
            return alert('아이디는 4자 이상 15자 이하의 영문자여야 합니다.')
        }

        const password_check = /^[a-z0-9]{3,19}$/g;
        const pw_check = document.getElementById('passwordcheck_signup').value.trim();
        if(!password_check.test(newMember.password)){
            return alert('비밀번호는 4자 이상 20자 이하여야 합니다.')
        }else if(newMember.password !== pw_check){
            return alert('비밀번호가 일치하지 않습니다.')
        }

        const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
                if(!newMember.email.match(email_check)){
                    return alert('올바른 이메일 형식을 입력하세요.');
                }

        if(newMember.nickname.length === 0 || newMember.nickname.length < 2){
            return alert('이름은 2글자 이상이어야 합니다.');
        }

        // 서버 전송
        const memberbox = {
             userid: newMember.id,
             userpassword: newMember.password,
             useremail: newMember.email,
             usernickname: newMember.nickname
        };

        console.log(memberbox);

        fetch("http://localhost:3002/join", { 
            method: "post",
            headers: {
                 "content-type": "application/json",
            },

            body: JSON.stringify(memberbox),
       })
       .then((response) => response.json())
       .then((result) => console.log("결과: ", result));

       setNewMember({
            id:'',
            password:'',
            email:'',
            nickname:'',
       });

    console.log("Fetch function complete");

       return alert('회원 가입 완료!');
   };

    //   const onReset = () =>{
    //       setNewMember({
    //           [e.target.name]: ''
    //       })
    //   };




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

    }



    return (
         <container>
             <Navi></Navi>
             <div id="space"></div>

             <div class="signupBox">
                 <p id="signupLogo">Sign Up</p>
                 <form class="inputField">
                     <p id="idpara">· ID</p>
                     <input id="id_signup" name="id" onChange={handleChange} type="text" placeholder="id"/>
                     <button onClick={idCheck}>중복확인</button><br/>
                     {/* <p id="idcheck"></p> */}
                     <p id="pwpara">· Password</p>
                     <input type="password" name="password" onChange={handleChange} id="password_signup" placeholder="password" /><br/>
                     <input type="password" name="passwordcheck" id="passwordcheck_signup" placeholder="password check" />
                     {/* <p id="checkpara"> * 비밀번호가 일치하지 않습니다.</p> */}
                     <p id="emailpara">· Email</p>
                     <input type="email" name="email" onChange={handleChange} id="email_signup" placeholder="email" /><br/>
                     <p id="nicknamepara">· Nickname</p>
                     <input name="nickname" id="nickname_signup" onChange={handleChange} placeholder="nickname" /><br/>
                     <input type="checkbox" id="policyagree" /> <span id="policypara"> SEED 정책에 동의합니다. </span><br/>
                     <button type="submit" id="signupSubmitBtn" onClick={onclick}>Sign up</button>
                     <p id="orpara">─────────────　OR　─────────────</p>
                     <button id="googleSignup"><img src={googleIcon} id="googleIcon"/>Google로 회원 가입하기</button>
                     <p id="loginpara">Already have a account?<Link to="/login"><b id="gologin">　Log in</b></Link></p>

                 </form>
             </div>
         </container>
    );
  }

   export default Signup;