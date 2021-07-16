import React, { Component } from 'react';
import './see_cartegory.css';
import Navi from '../Components/Navi';

class see_cartegory extends Component {
  render () {
    return (
      <div className="Content">
        <Navi></Navi>
        <div class='hashtag_button'>
          <div class='explain'>
            <h2>See Keyword</h2>
            <h3>해시태그로 리뷰 모아보기</h3>
          </div>
          <div class='get_hashtag'>
            <div>
              <button id='1'>1</button>
              <button id='2'>2</button>
              <button id='3'>3</button>
              <button id='4'>4</button>
              <button id='5'>5</button>
            </div>
            <div>
              <button id='6'>6</button>
              <button id='7'>7</button>
              <button id='8'>8</button>
              <button id='9'>9</button>
              <button id='10'>10</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default see_cartegory;