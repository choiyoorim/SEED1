import React, { Component } from 'react';
import './content_express.css';
import Navi from '../Components/Navi';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FaHeart} from "react-icons/fa";
import {AiOutlineHeart} from "react-icons/ai";


class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      data:[],
      date:"",
      none_like:<AiOutlineHeart/>,
      like:<FaHeart/>
    }
  }
  _toggleLike = async function() {
    alert('이 글에 좋아요를 눌렀습니다.')
  }
  render () {
    const { none_like } = this.state;

    return (
      <div className="App">
        <Navi></Navi>
        <div class="container">
          <div class="right">
            <p>작가이름</p>
            <div className='other_div'>
              <img src={none_like} onClick={() => this._toggleLike()}/>
            </div>
          </div>
          <div class="content">
            <div class="title">
              <h2>제목</h2>
            </div>
            <hr class="line"></hr>
            <div class="text">
              <p>내용 https://html.spec.whatwg.org/multipage/ is the current HTML standard. It obsoletes all other previously-published HTML specifications.

As announced at https://www.w3.org/blog/2019/05/w3c-and-whatwg-to-work-together-to-advance-the-open-web-platform/, the W3C and the WHATWG signed an agreement to collaborate on the development of a single version of the HTML and DOM specifications:

https://html.spec.whatwg.org/multipage/ is the single version of HTML being actively developed
https://dom.spec.whatwg.org/ is the single version of the DOM specification being actively developed.
For further details about the W3C-WHATWG agreement, see the Memorandum of Understanding Between W3C and WHATWG.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;