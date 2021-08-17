import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShortReviewList.css'
import axios from 'axios';
class ShortReviewList extends Component {
  
  render() {
    return(
      <tr className="content-container">
        <td id="numId">{this.props.numId}</td>
        <td id="movieCode">{this.props.movieCode}</td>
        <td id="reviewContent">{this.props.content}</td>
        <td id="writer">{this.props.writer}</td>
        <td id="date">{this.props.date}</td>
      </tr>
    )
  }
}

export default ShortReviewList;