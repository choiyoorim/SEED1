import React, { Component } from 'react';
import './SearchForm.css';


class Search extends Component {
  constructor(props){
      super(props)
  }
  render() {
    return (
        <div>
            <form>
              <input type='text' maxLength='30' className='search_input' name='search' placeholder='검색어를 입력해주세요.'/>
              <input type='submit' value='검색' className='search_submit'/>
            </form>
        </div>
    );
  }
}

export default Search;