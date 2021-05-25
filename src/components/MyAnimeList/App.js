import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//Styles
import './App.scss';


class App extends Component {
  componentDidMount() {
    document.title = 'My Anime List';
  }

  dbTestHandle = () => {
    console.log("Буде трішки пізіше");
  }

  render() {
    return (
      <div className="my_anime_list__page_wrapper">
        <Link to={'/projects'} className="back_to_home_link">
          {/* <span className="icon-return"></span> */}
          <i className="fas fa-angle-left"></i>
          <span className="back_to_home_link__text">Back</span>
        </Link>
        <div className="mal_table">
          <div className="mal_table__header">
            <div className="mal_table__header_column">Japanese</div>
            <div className="mal_table__header_column">Ukrainian</div>
            <div className="mal_table__header_column">Type</div>
          </div>
          <div className="mal_table__row">
            <div className="mal_table__column">Boogiepop wa Warawanai: Boogiepop Phantom</div>
            <div className="mal_table__column">Буґіпоп не сміється (Буґіпоп Фантом)</div>
            <div className="mal_table__column">TV1</div>
          </div>
          <div className="mal_table__row">
            <div className="mal_table__column">Bokura wa Minna Kawaisou</div>
            <div className="mal_table__column">Диваки з маєтку Кавай</div>
            <div className="mal_table__column">TV1(7 - 12)</div>
          </div>
        </div>
        <button id="db_test_btn" onClick={this.dbTestHandle}>Click</button>
      </div>
    )
  }
}

export default App;