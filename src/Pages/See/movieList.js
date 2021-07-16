import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './movieList.css';

class movieList extends Component {
  render() {
    return(
      <div>
        {/*
        <div class="moviePage">
          {this.props.id}
          <div id="poster">poster</div>
          <h3 id="title">{this.props.title}</h3>
          <p id="writer">{this.props.directorr}</p>
          <p id="actor">{this.props.actor}</p>
          <p id="date">{this.props.date}</p>
          <Link id="RListP" to='/RList'>리뷰보기</Link>
        </div>
        */}

        <div class="moviePage">
          <div id="poster">poster</div>
          <div id="title">Catch Me If You Can</div>
          <div id="director">director</div>
          <div id="actor">actor1, actor2</div>
          <div id="date">2020-05-06</div>
          <div>
            <div class="link"><Link to=''>리뷰작성하기</Link></div>
            <div class="link"><Link to='/RList'>리뷰보기</Link></div>
          </div>
        </div>
      </div>
    );
  }
}

export default movieList;