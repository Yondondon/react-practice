import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

class UserControl extends Component {
  handleLoadUserPopup = () => {
    document.querySelector(".popup_overlay").style.display = "block";
    document.querySelector(".load_user_todo__popup").style.display = "flex";
  }

  closePopup = () => {
    document.querySelector(".popup_overlay").style.display = "none";
    document.querySelector(".load_user_todo__popup").style.display = "none";
    document.getElementById("todo_username").value = "";
  }

  handleLoadUser = () => {
    //hide popup and overlay
    document.querySelector(".popup_overlay").style.display = "none";
    document.querySelector(".load_user_todo__popup").style.display = "none";

    //hide error message on load
    document.querySelector('.todo_list_error_message').style.display = "none";

    if(this.props.todo_app.user.isUser) {
      //change text on Save btn to default
      document.getElementById("todo_save_to_file__icon").style.opacity = "1";
      document.getElementById("todo_save_to_file__text").style.opacity = "1";
      document.getElementById("todo_save_to_file__saved").style.opacity = "0";
    }

    let username = document.getElementById('todo_username').value;
    let url = `http://localhost:1535/get_todos?username=${username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(data.status === "success") {
          this.props.dispatch({ type: "RENDER_TODOS_LIST", payload: data.payload});
          this.props.dispatch({ type: "TODO_USER", payload: {
            isUser: true,
            username: username
          }});
        } else {
          this.props.dispatch({ type: "RENDER_TODOS_LIST", payload: {
            todos: [],
            completed_todos: []
          }});
          this.props.dispatch({ type: "TODO_USER", payload: {
            isUser: false,
            username: username
          }});
          document.querySelector('.todo_list_error_message').style.display = "block";
        }
    });

    document.getElementById('todo_username').value = "";
  }

  handleSaveToFile = () => {
    let url = `http://localhost:1535/save_todos?username=${this.props.todo_app.user.username}`;

    let user_todos = {
      todos: this.props.todo_app.todos,
      completed_todos: this.props.todo_app.completed_todos
    }

    if(this.props.todo_app.user.isUser) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(user_todos)
      })
        .then(response => response.json())
        .then(data => {
  
          //change text on Save btn to Saved!
          document.getElementById("todo_save_to_file__icon").style.opacity = "0";
          document.getElementById("todo_save_to_file__text").style.opacity = "0";
          document.getElementById("todo_save_to_file__saved").style.opacity = "1";
  
          console.log("Saved!", data);
        });
    } else {
      document.querySelector('.todo_list_error_message').style.display = "block";
    }
  }

  createUser = () => {
    let url = `http://localhost:1535/create_todo_user?username=${this.props.todo_app.user.username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.props.dispatch({ type: "RENDER_TODOS_LIST", payload: {
          todos: [],
          completed_todos: []
        }});
        this.props.dispatch({ type: "TODO_USER", payload: {
          isUser: true,
          username: this.props.todo_app.user.username
        }});
        document.querySelector('.todo_list_error_message').style.display = "none";
        
      });
  }

  render() {
    return(
      <Fragment>
        <div className="user_control_wrap">
          <button id="todo_load_user_popup" className="custom_button" onClick={this.handleLoadUserPopup}>
            <i className="fas fa-sign-in-alt"></i>
            <span>Load</span>
          </button>
          <button id="todo_save_to_file" className="custom_button" onClick={this.handleSaveToFile}>
              <i id="todo_save_to_file__icon" className="fas fa-save"></i>
              <span id="todo_save_to_file__text">Save</span>
              <span id="todo_save_to_file__saved">Saved!</span>
            </button>
        </div>
        { this.props.todo_app.user.isUser && <div className="todo_list_info_message">Hello, { this.props.todo_app.user.username }. Here are your todos:</div> }
        

        <div className="todo_list_error_message">
          <span>There is no such user. Wanna create?</span>
          <button id="create_user" className="custom_button" onClick={this.createUser}><i className="fas fa-user-plus"></i><span>Create user</span></button>
        </div>

        <div className="popup_overlay"></div>
        <div className="load_user_todo__popup">
          <input id="todo_username" placeholder="Enter username..." />
          <button id="todo_load_user" className="popup_button" onClick={this.handleLoadUser}>Ok</button>
          <button className="close_popup popup_button" onClick={this.closePopup}>Cancel</button>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo_app: {
      todos: state.todo_app.todos,
      completed_todos: state.todo_app.completed_todos,
      user: state.todo_app.user
    }
  }
}

export default connect(mapStateToProps)(UserControl);