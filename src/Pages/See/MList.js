import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import { BsSearch } from "react-icons/bs";
import Navi from '../Components/Navi';
import MovieList from './movieList';
import'./MList.css';
import SearchForm from './searchForm';


class MList extends Component {
  constructor(props){
    super(props);
    this.state={
      reviewData : [
        {
          id: 1,
          title: 'catch me if you can',
          director: 'yuna',
          date: '2020/6/20',
          actor:'yuna'
        },
        {
          id: 2,
          title: 'parasite',
          director: 'yurim',
          date: '2020/6/20',
          actor:'yurim'
        },
        {
          id: 3,
          title: 'avengers',
          director: 'heejin',
          date: '2020/6/20',
          actor:'heejin'
        }
      ]
    }
  }
  state = {
    movie: ''
  }
  handleChange = (e) => {
    this.setState({
      movie: e.target.value
    })
  }
  render () {
    return (
      <div className="App">
        <Navi></Navi>
        <SearchForm></SearchForm>
        {/*
        <h3 id="result">' {this.state.movie} '에 대한 영화 검색</h3>
        {this.state.reviewData.map((data)=> {
          return React.createElement(movieList, {id: data.id, title: data.title, director: data.director, date: data.date, actor:data.actor, key: data.id});
        })}
        */}
        <MovieList></MovieList>
      </div>
    );
  }
}

export default MList;