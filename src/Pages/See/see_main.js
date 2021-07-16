import React, { Component } from 'react';
import './see_main.css';
import Navi from '../Components/Navi';
import Cartegory from './see_cartegory';
import SearchForm from './searchForm';


class see_main extends Component {
    render() {
      return(
        <div>
          <Navi></Navi>
          <SearchForm></SearchForm>
          <Cartegory></Cartegory>
        </div>
      );
    }
}

export default see_main;