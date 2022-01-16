import Axios from 'axios';
import React, { Component, useEffect, useState }from "react";
import { Link } from 'react-router-dom';
import './Withdrawal.css';


function Withdrawal() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [policyagree, setPolicyagree] = useState(false);
    const [password, setPassword] = useState("");
    const [delStatus, setDelStatus] = useState("");

    Axios.defaults.withCredentials = true;


    //회원 정보 삭제
    const withdrawal = () => {
        if(!(password.length >0)){
            return alert('비밀번호를 입력해야합니다.');
        }

        if(!policyagree){
            return alert('SEED 정책에 동의하셔야 합니다.');
        } else{
            Axios.post('http://localhost:3002/user/withdrawal', {
                userID: user.data.result[0].userID,
                userPW: password
            }).then((response)=>{
                if(!response.data.success){
                    setDelStatus(response.data.message);
                }else{
                    //session에서 user정보 삭제
                    sessionStorage.removeItem('user');
                    window.location.replace("/");
                    alert("회원 탈퇴 되었습니다.")
                }
            });
        }
    };


    
    return (
        <>
        <div id="space"/>
        <div className="loginBox">
            <p id="loginLogo">Leave Account</p>
            <span style={{fontSize :'1rem', color:'black'}}>회원 탈퇴 전 아래 약관을 읽어주세요.</span>
            <div>
                <textarea id="privacy_scroll" readonly>
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
            -개인정보 취급방침 동의내용 작성하시면 됩니다.-
                </textarea>			
            </div>  
            {/* method='post' 방식으로 수정할 예정*/}
            <form className="inputField">
                <input type="checkbox" name="agreement" 
                    onClick={(e)=>{
                        setPolicyagree(e.target.value);
                    }}/>
                <span style={{fontSize :'1rem', color:'black'}}>이용약관에 동의합니다.</span>
                <br/>
                <input type="password" 
                    id="password_login" 
                    placeholder='비밀번호 확인' 
                    name='inputPW' 
                    onChange={(e)=>{
                        setPassword(e.target.value);
                    }}
                />
                <br/>
                <p id='login_status'>{delStatus}</p>
                <br/>
                <Link to="#"><button id="enterBtn" onClick={withdrawal}>회원 탈퇴</button></Link>
            </form>
        </div>
        </>
    );
}

export default Withdrawal;