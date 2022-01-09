import React, { useState } from 'react';
import emailjs from 'emailjs-com';

import './ContactUs.css';

export default function ContactUs() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userNickname = user.data.result[0].userNickname;
  const userEmail = user.data.result[0].userEmail;
  // const userNickname= localStorage.getItem('userNickname');
  // const userEmail = localStorage.getItem('userEmail');
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  function sendEmail(e) {
    e.preventDefault(); //제출 시 내용 사라지지 않게 함

    if(title.length === 0){
      return alert("제목을 입력하세요");
    }

    if(contents.length == 0){
      return alert("내용을 입력하세요");
    }

    emailjs.sendForm('service_j3hy8f7', 'template_f08s5je', e.target, 'user_zFINoRCdzAAr5RPP6Rk3H')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
    setTitle("");
    setContents("");
    alert('의견내주셔서 감사합니다. 메시지가 전송되었습니다.')

  };

  return (
    <section id="contactSection">
      <div className="contact" id="contactBox">
        <p id="contactLogo">contact us</p>
        <p> 
          사이트에 대한 의견이나 불편사항 등을 보내주세요. <br/>여러분의 의견은 SEED의 발전에 큰 도움이 됩니다.
        </p>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number"/>
          <label>Name</label>
          <input type="text" name="user_name" value={userNickname} readOnly/>
          <label>Email</label>
          <input type="text" name="user_email" value={userEmail} readOnly/>
          <label>Title</label>
          <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value);}}/>
          <label>Message</label>
          <textarea name="message" onChange={(e)=>{setContents(e.target.value);}}/>
          <input type="submit" id="contactUsBtn" value="Send" />
        </form>
      </div>      
    </section>
    
  );
}