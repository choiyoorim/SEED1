import React, { Component, useEffect, useState }from "react";
import './Withdrawal.css';


function Withdrawal() {

    const [password, setPassword] = useState("");


    //회원 정보 삭제
    const withdrawal = () => {
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
            <form className="inputField" method="POST">
                <div>
                    <label>
                        <input type="checkbox" name="agreement" />
                        <span style={{fontSize :'1rem', color:'black'}}>이용약관에 동의합니다.</span>
                    </label>
                </div>
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
                <button id="enterBtn" onClick={withdrawal}>회원 탈퇴</button><br/>
            </form>
        </div>
        </>
    );
}

export default Withdrawal;