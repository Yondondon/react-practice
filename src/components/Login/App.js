import React, { Component } from 'react';
import { connect } from 'react-redux';

class Login extends Component {
  componentDidMount() {
    document.title = "WHO ARE YOU?";
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let login = document.getElementById("login").value;
    let pass = document.getElementById("password").value;
    let url = `http://localhost:1535/login/?username=${login}&pass=${pass}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.props.dispatch({ type: "USER_LOGIN", payload: {
            isUser: true,
            username: login
          }});
        }
      });
    document.getElementById("login").value = "";
    document.getElementById("password").value = "";
  }

  render() {
    return (
      <div className="main_wrapper">
        <form className="login_form">
          <div className="form_title">Who are you? </div>
          <div className="form-group">
            <input type="email" className="form-control" autoComplete="off" id="login" aria-describedby="Login" placeholder="Login" />
          </div>
          <div className="form-group">
            <input type="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <button type="submit" onClick={this.handleSubmit} className="btn btn-primary">Check me!</button>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login);