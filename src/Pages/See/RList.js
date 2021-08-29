import React, { Component } from 'react';
import './RList.css';
import ReviewList from './ShortReviewList';
//import { Link } from 'react-router-dom';

class RList extends Component {
    
    render () {
      const list = this.state.reviewData;

      return (
        <div>
          
          <table className="reviewInfo">
            <tbody>
              <tr>
                <td id="no">No.</td>
                <td id="title">Title</td>
                <td id="writer">Writer</td>
                <td id="date">Date</td>
              </tr>
              <br></br>
              {this.state.reviewData.map((data)=> {
                return React.createElement(ReviewList, {id: data.id, title: data.title, writer: data.writer, date: data.date, key: data.id});
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
  
  export default RList;