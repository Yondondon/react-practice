import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainApp extends Component {
  componentDidMount() {
    document.title = "Title?";
  }

  render() {
    return (
      <div className="main_wrapper">
        <Link to={'/projects'}>
          <img src="/img/gurren-dan.png" className="img-responsive gurren-dan_img" alt="" />
        </Link>
      </div>
    )
  }
}

export default MainApp;