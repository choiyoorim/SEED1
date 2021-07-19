import React, { Component } from 'react';
import './SeeCategory.css';
import Navi from '../../Components/Navi';

class SeeCategory extends Component {
  render () {
    return (
      <div className="Content">
        <div class='hashtag_button'>
          <div class='explain'>
            <h2>See Keyword</h2>
            <h3>해시태그로 리뷰 모아보기</h3>
          </div>
          <div class='get_hashtag'>
            <div>
              <button id='num'>1</button>
              <button id='num'>2</button>
              <button id='num'>3</button>
              <button id='num'>4</button>
              <button id='num'>5</button>
            </div>
            <div>
              <button id='num'>6</button>
              <button id='num'>7</button>
              <button id='num'>8</button>
              <button id='num'>9</button>
              <button id='num'>10</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SeeCategory;