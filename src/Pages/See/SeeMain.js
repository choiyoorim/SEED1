import React, { Component } from 'react';
import axios from 'axios';
import './SeeMain.css';
import Movie from './MovieCard';
import Review from './ReviewCard';
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";


class SeeMain extends Component  {
  state = {
    isLoading: true,
    searchMovies: [],
    topMovies: [],
    topLikeReviews: [],
    topViewReviews: [],
    search: "rush"
  };
  
  //영화 검색
  searchMovie = async () => {
    const search = this.state.search;
    const res = await axios.post('//localhost:3002/api/see/searchMovie',{search});
    console.log(res);
    this.setState({ searchMovies : res.data, isLoading: false });
  }
  

  //좋아요 수 많은 리뷰 2개
  getTopLikeReviews = async () => {
    const res = await axios.get('//localhost:3002/api/see/topLikeReviews');
    console.log(res);
    this.setState({ topLikeReviews : res.data, isLoading: false });
  };

  //조회수 많은 리뷰 2개
  getTopViewReviews = async () => {
    const res = await axios.get('//localhost:3002/api/see/topViewReviews');
    console.log(res);
    this.setState({ topViewReviews : res.data, isLoading: false });
  };

  //영화2개
  getMovies = async () => {
    const res = await axios.get('//localhost:3002/api/see/movie');
    console.log(res);
    this.setState({ topMovies : res.data, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
    this.getTopLikeReviews();
    this.getTopViewReviews();
  }


  render() {
    const { isLoading, searchMovies, topMovies, topLikeReviews, topViewReviews} = this.state;
    return (
      <section className="seeMain_container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="SeeMain_Container">
            <form className="searchForm">
              <input type='text' maxLength='20' className='search_bar' name='search' placeholder='영화를 검색해보세요.'/>
              <input type='submit' value='검색' className='search_but'></input>
            </form>
            <div>

            </div>
            <h3 className="review_text_like"><FaHeart/>가 많은 리뷰_E TOP 2</h3>
            <div className="topReviews" id="map">
              {topLikeReviews.map(review => (
                <Review
                  key={review.reviewID}
                  id={review.reviewID}
                  writer={review.userID}
                  title={review.reviewTitle}
                  likeC={review.likeCount}
                  viewC={review.viewCount}
                  content={review.reviewContent}
                />
              ))}
            </div>
            <h3 className="review_text_view"><FaEye/>가 많은 리뷰_E TOP 2</h3>
            <div className="topReviews" id="map">
              {topViewReviews.map(review => (
                <Review
                  key={review.reviewID}
                  id={review.reviewID}
                  writer={review.userID}
                  title={review.reviewTitle}
                  likeC={review.likeCount}
                  viewC={review.viewCount}
                  content={review.reviewContent}
                />
              ))}
            </div>
            <h3 className="review_text_movie">'리뷰'가 많은 영화 TOP 2</h3>
            <div className="movies" id="map">
              {topMovies.map(movie => (
                <Movie
                  key={movie.movieCODE}
                  id={movie.movieCODE}
                  year={movie.year}
                  title={movie.title}
                  summary={movie.plot}
                  poster={movie.image_url}
                />
              ))}
            </div>
            <div className="moreReview">
                <button className="loadMore_but">더 많은 리뷰 보러가기</button>
            </div>
          </div>
        )}
      </section>
    );
  }
}


export default SeeMain;