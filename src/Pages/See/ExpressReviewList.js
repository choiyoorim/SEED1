import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ExpressReviewContent from './ExpressReviewContent';

class ExpressReviewList extends Component {
  render() {
    return(
        <tr>
          <td id="numId">{this.props.numId}</td>
          <td id="movieCode">{this.props.movieCode}</td>
          <Link to={`/expressreviewcontent/${this.props.numId}`}><td id="reviewTitle">{this.props.reviewtitle}</td></Link>
          <td id="writer">{this.props.writer}</td>
          <td id="date">{this.props.date}</td>
        </tr>
    );
  }
}

export default ExpressReviewList;