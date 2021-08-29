import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './movieList.css';

class MovieList extends Component {
  render() {
    return(
      <div>
        <div class="moviePage">
          <div id="poster">poster</div>
          <div id="title">Catch Me If You Can</div>
          <div id="director">director</div>
          <div id="actor">actor1, actor2</div>
          <div id="date">2020-05-06</div>
          <div>
            <div class="link"><Link to='/ShortWrite'>리뷰작성하기</Link></div>
            <div class="link"><Link to='/RList'>리뷰보기</Link></div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieList;