import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Projects extends Component {
  componentDidMount() {
    document.title = "Yon's React Apps";
  }
  render() {
    return(
      <div className="main_wrapper">
        <div className="main_container">
          <Link className="link_to_app" to={'/counter'}>Counter</Link>
          <Link className="link_to_app" to={'/todo'}>Todo</Link>
          <Link className="link_to_app" to={'/my_anime_list'}>My Anime List</Link>
        </div>
      </div>
    )
  }
}

export default Projects;