import React, { Component } from 'react';
import './SeeMain.css';
import Category from './SeeCategory';
import SearchForm from './SearchForm';


class SeeMain extends Component {
    render() {
      return(
        <div>
          <SearchForm></SearchForm>
          <Category></Category>
        </div>
      );
    }
}

export default SeeMain;