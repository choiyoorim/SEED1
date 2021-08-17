import React from 'react';
import emailjs from 'emailjs-com';

import './ContactUs.css';

export default function ContactUs() {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_j3hy8f7', 'template_f08s5je', e.target, 'user_zFINoRCdzAAr5RPP6Rk3H')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
    e.target.reset();
    alert('의견내주셔서 감사합니다. 메시지가 전송되었습니다.')
  }

  return (
    <section>
      <div className="contact">
        <p> 
          사이트에 대한 의견, 불편사항 등을 보내주세요. seed가 발전하는데 큰 도움이 될 것입니다.
        </p>
        <form className="contact-form" onSubmit={sendEmail}>
          <input type="hidden" name="contact_number" />
          <label>Name</label>
          <input type="text" name="user_name" />
          <label>Email</label>
          <input type="email" name="user_email" />
          <label>Title</label>
          <input type="text" name="title" />
          <label>Message</label>
          <textarea name="message" />
          <input type="submit" value="Send" />
        </form>
      </div>      
    </section>
    
  );
}