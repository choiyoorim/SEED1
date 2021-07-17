import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ReviewList extends Component {
  render() {
    return(
        <tr>
          <td id="no">{this.props.id}</td>
          <td id="title"><Link to='/content'>{this.props.title}</Link></td>
          <td id="writer">{this.props.writer}</td>
          <td id="date">{this.props.date}</td>
        </tr>
    );
  }
}

export default ReviewList;