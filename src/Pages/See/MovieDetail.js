import React from "react";
import './MovieDetail.css';
import axios from 'axios';
import ReviewList from './ReviewListCard';
import {FaHeart} from "react-icons/fa";
import {FaEye} from "react-icons/fa";
import {BsFillPersonFill} from "react-icons/bs";

class reviewListDetail extends React.Component{
    state = {
        isLoading: true,
        reviews: []
      };
    //리뷰 가져오기
    getReviews = async () => {
        const movieCODE = this.props.match.params.id;
        await axios.post('//localhost:3002/api/see/movie/reviewList', {movieCODE})
        .then((res)=>{
            this.setState({ reviews : res.data, isLoading: false });
        });
    };

    componentDidMount(){
        const { location, history } = this.props;
        /*if(location.state === undefined) {
            history.push("/");
        }*/
        this.getReviews();
    }

    render() {
        const {location} = this.props;
        const {reviews} = this.state;
        return (
            <div className MovieDetail_Container>
                <div className="detail_container">
                    
                    <img className="detail_img" src={location.state.poster} alt={location.state.title} title={location.state.title}/>
                   
                    <div className="detail_movie_data">
                        <h3 className="movie_title">{location.state.title}</h3>
                        <h5 className="movie_year">{location.state.year}</h5>
                        <p className="movie_summary">{location.state.summary}</p>
                    </div>
                </div>
                <div className="reviewlist">
                    <table className="review_column">
                        <tbody>
                        <tr>
                            <td>No.</td>
                            <td>Title</td>
                            <td><BsFillPersonFill/></td>
                            <td><FaHeart/></td>
                            <td><FaEye/></td>
                        </tr>
                        {reviews.map(review => (
                            <ReviewList
                                key={review.reviewID}
                                id={review.reviewID}
                                writer={review.userID}
                                title={review.reviewTitle}
                                likeC={review.likeCount}
                                viewC={review.viewCount}
                                content={review.reviewContent}
                                pubDate={review.pubDate}
                                movieCode={review.movieCode}
                            />
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default reviewListDetail;