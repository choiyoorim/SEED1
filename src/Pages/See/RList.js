import React, { Component } from 'react';
import './RList.css';
import Navi from '../../Components/Navi';
import ReviewList from './ReviewList';
//import { Link } from 'react-router-dom';

class RList extends Component {
    constructor(props){
      super(props);
      this.state={
        reviewData : [
          {
            id: 1,
            title: 'catch me if you can',
            content:'1s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yuna',
            date: '2020/6/20'
          },
          {
            id: 2,
            title: 'parasite',
            content:'2s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yurim',
            date: '2020/12/7'
          },
          {
            id: 3,
            title: 'avengers',
            content:'3s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'jea0',
            date: '2021/5/29'
          },
          {
            id: 4,
            title: 'catch me if you can',
            content:'4s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'heejin',
            date: '2020/6/20'
          },
          {
            id: 5,
            title: 'parasite',
            content:'5s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yurim',
            date: '2020/12/7'
          },
          {
            id: 6,
            title: 'avengers',
            content:'6s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'jea0',
            date: '2021/5/29'
          },
          {
            id: 7,
            title: 'catch me if you can',
            content:'7s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yuna',
            date: '2020/6/20'
          },
          {
            id: 8,
            title: 'parasite',
            content:'8s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'heejin',
            date: '2020/12/7'
          },
          {
            id: 9,
            title: 'avengers',
            content:'9s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'jea0',
            date: '2021/5/29'
          },
          {
            id: 10,
            title: 'catch me if you can',
            content:'10s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yuna',
            date: '2020/6/20'
          },
          {
            id: 11,
            title: 'parasite',
            content:'11s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'yurim',
            date: '2020/12/7'
          },
          {
            id: 12,
            title: 'avengers',
            content:'12s;lja;sdljfjwlne;nwajgwl;jgow;newlanj;n;fjlda;jslnvgla',
            writer: 'heejin',
            date: '2021/5/29'
          }
        ],
        page:1,
        limit:10
      }
    }
    
    render () {
      const list = this.state.reviewData

      /*
      const total_cnt = 12;
      const { limit } = this.state;
      let page_arr = [];
      for(let i =1; i<= Math.ceil(total_cnt / limit); i++) {
        page_arr.push(i);
      }
      console.log(page_arr);
      this.setState({ data : this.state.reviewData, all_page : page_arr})
      */

      return (
        <div>
          {/*
          <div className="RList">
            <div className="reviewInfo">
              <div>제목</div>
              <div>조회수</div>
              <div>작성자</div>
              <div className="acenter">날짜</div>
            </div>
            {list ? list.map( (el, key) => {
              return(
                <div className="list_grid list_data" key={key}>
                  <div>{el.title}</div>
                  <div></div>
                  <div className="acenter">{el.data.slice(0, 10)}</div>
                </div>
              )
            })
              : null}
          </div>
          */}
          
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