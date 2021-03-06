import React from "react";
import './MovieDetail.css';
import axios from 'axios';
import ReviewEList from './ReviewListCard';
import ReviewSList from './ReviewSListCard';
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";
import {Link} from "react-router-dom";

const user = JSON.parse(sessionStorage.getItem('user'));
// const auth= localStorage.getItem('auth');

class MovieDetail extends React.Component{
    state = {
        movie: [],
        reviewsE: [],
        reviewsS: []
      };

    //영화 정보 가져오기
    getMovieInfo = async () => {
        const movieCODE = this.props.match.params.id;
        await axios.post('//localhost:3002/api/see/movie/info', {movieCODE})
        .then((res)=>{
            this.setState({ movie : res.data[0]});
        });
    };

    //리뷰E 가져오기
    getReviewsE = async () => {
        const movieCODE = this.props.match.params.id;
        await axios.post('//localhost:3002/api/see/movie/reviewListE', {movieCODE})
        .then((res)=>{
            this.setState({ reviewsE : res.data, isLoading: false });
        });
    };

    //리뷰S 가져오기
    getReviewsS = async () => {
        const movieCODE = this.props.match.params.id;
        await axios.post('//localhost:3002/api/see/movie/reviewListS', {movieCODE})
        .then((res)=>{
            this.setState({ reviewsS : res.data, isLoading: false });
        });
    };

    componentDidMount(){
        const { location, history } = this.props;
        /*if(location.state === undefined) {
            history.push("/");
        }*/
        this.getMovieInfo();
        this.getReviewsE();
        this.getReviewsS();
    } 

    isAuth(){
        if(!user){
            window.location.replace("/see")
            alert("seed를 이용하기 전에 로그인 해야합니다.");
        }
        localStorage.setItem('edit', false);
    }

    render() {
        const {reviewsE, reviewsS, movie} = this.state;
        return (
            <div className="MovieDetail_Container">
                <div className="detail_container">
                    {/*
                    <img className="detail_img" src={location.state.poster} alt={location.state.title} title={location.state.title}/>
                    */}
                    <div className="detail_movie_data">
                        <h3 className="movie_title">{movie.title}</h3>
                        <h5 className="movie_year">{movie.year}</h5>
                        <p className="movie_summary">{movie.plot}</p>
                        <Link to="/write"><button onClick={this.isAuth} className="movieTOWrite_but">리뷰 작성하기</button></Link>
                    </div>
                </div>
                <div className="reviewlist">
                    <p>REVIEW_E</p>
                    <table className="review_table">
                        <tr>
                            <td className="mdNo">No.</td>
                            <td className="mdTItle"> Title</td>
                            <td className="mdWriter"><BsFillPersonFill/></td>
                            <td className="mdNO"><FaEye/></td>
                        </tr>
                    </table>
                    <hr className="line"></hr>
                    <div class="reviewlist_map">
                        {reviewsE.map((review) => (
                            React.createElement(ReviewEList,
                                {
                                    key: review.reviewID,
                                    id: review.reviewID,
                                    writer: review.userID,
                                    title: review.reviewTitle,
                                    likeC: review.likeCount,
                                    viewC: review.viewCount,
                                    content: review.reviewContent,
                                    pubDate: review.pubDate,
                                    movieCode: review.movieCode}
                            )
                        ))}
                    </div>
                    <p>REVIEW_S</p>
                    <table className="review_table">
                        <tr>
                            <td className="mdNo">No.</td>
                            <td className="mdTItle"> Short</td>
                            <td className="mdWriter"><BsFillPersonFill/></td>
                            <td className="mdLike"><FaHeart/></td>
                            <td className="mdNO"><FaEye/></td>
                        </tr>
                    </table>
                    <hr className="line"></hr>
                    <div class="reviewlist_map">
                        {reviewsS.map((review) => (
                            React.createElement(ReviewSList,
                                {
                                    key: review.reviewID,
                                    id: review.reviewID,
                                    writer: review.userID,
                                    title: review.reviewContent,
                                    likeC: review.likeCount,
                                    viewC: review.viewCount,
                                    pubDate: review.pubDate,
                                    movieCode: review.movieCode}
                            )
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}


export default MovieDetail;