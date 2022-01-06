import React, { Component } from 'react';
import './SearchForm.css';

class searchForm extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
        <div>
            <form>
              <input type='text' maxLength='20' className='search_bar' name='search' placeholder='검색어를 입력하세요.'/>
              <input type='submit' value='검색' className='search_but'/>
            </form>
        </div>
    );
  }
}

export default searchForm;