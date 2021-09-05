import React, { Component } from 'react';
import axios from 'axios';
import './SeeMain.css';
import Movie from './MovieCard';
import Review from './ReviewCard';
import ReviewS from './ReviewSCard';
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import Search from './SearchForm';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';

class SeeMain extends Component  {
  state = {
    isLoading: true,
    searchMovies: [],
    topMovies: [],
    topLikeReviewsE: [],
    topLikeReviewsS: [],
    topViewReviews: []
  };

  //영화 검색
  searchMovies = async () => {
    const search = queryString.parse(this.props.location.search);
    console.log(search);
    const res = await axios.post('//localhost:3002/api/see/searchMovie', search);
    console.log(res);
    this.setState({ searchMovies : res.data, isLoading: false });
  };


  //좋아요 수 많은 리뷰E 2개
  getTopLikeReviewsE = async () => {
    const res = await axios.get('//localhost:3002/api/see/topLikeReviewsE');
    console.log(res);
    this.setState({ topLikeReviewsE : res.data });
  };

  //좋아요 수 많은 리뷰S 2개
  getTopLikeReviewsS = async () => {
    const res = await axios.get('//localhost:3002/api/see/topLikeReviewsS');
    console.log(res);
    this.setState({ topLikeReviewsS : res.data });
  };

  //조회수 많은 리뷰E 2개
  // getTopViewReviews = async () => {
  //   const res = await axios.get('//localhost:3002/api/see/topViewReviews');
  //   console.log(res);
  //   this.setState({ topViewReviews : res.data, isLoading: false });
  // };

  //영화2개
  getMovies = async () => {
    const res = await axios.get('//localhost:3002/api/see/movie');
    console.log(res);
    this.setState({ topMovies : res.data});
  };

  componentDidMount() {
    this.searchMovies();
    this.getMovies();
    this.getTopLikeReviewsE();
    this.getTopLikeReviewsS();
  }


  render() {
    const { isLoading, searchMovies, topMovies, topLikeReviewsE, topLikeReviewsS, topViewReviews} = this.state;
    return (
      <section className="seeMain_container">
        {isLoading ? (
          <div className="loader">
            <span className="loader__text">Loading...</span>
          </div>
        ) : (
          <div className="SeeMain_Container">
            <div>
              <Search></Search>
              <div className="movies" id="map">
              {searchMovies.map(movie => (
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
            </div>
            <h3 className="review_text_like"><FaHeart/>가 많은 리뷰_E TOP 2</h3>
            <div className="topReviews" id="map">
              {topLikeReviewsE.map(review => (
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
            <h3 className="review_text_like"><FaHeart/>가 많은 리뷰_S TOP 2</h3>
            <div className="topReviews" id="map">
              {topLikeReviewsS.map(review => (
                <ReviewS
                  key={review.reviewID}
                  id={review.reviewID}
                  writer={review.userID}
                  likeC={review.likeCount}
                  viewC={review.viewCount}
                  content={review.reviewContent}
                />
              ))}
            </div>
            <Link to="/shortreview"><Button className="details_movie">더보기</Button></Link>
          </div>
        )}
      </section>
    );
  }
}


export default SeeMain;