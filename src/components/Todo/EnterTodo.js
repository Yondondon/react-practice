import React, { Component } from 'react';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import UserControl from './UserControl';

class EnterTodo extends Component {
  //adds new todo when 'Enter' key pressed
  submitTodoOnKey = (e) => {
    if (e.keyCode === 13) {
      this.props.updateData(document.getElementById('input_todo').value);
      document.getElementById('input_todo').value = '';
    }
  }

  //adds new todo when button is clicked
  submitTodo = () => {
    this.props.updateData(document.getElementById('input_todo').value);
    document.getElementById('input_todo').value = '';
  }

  addTodo = () => {
    let input_value = document.getElementById('input_todo').value;
    input_value.length > 0 && this.props.dispatch({ 
      type: "ADD_TODO", 
      payload: { text: input_value, id: Math.random().toString() } 
    });
    document.getElementById('input_todo').value = '';
  }

  addTodoOnKey = (e) => {
    if (e.keyCode === 13) {
      let input_value = document.getElementById('input_todo').value;
      input_value.length > 0 && this.props.dispatch({ 
        type: "ADD_TODO", 
        payload: { text: input_value, id: Math.random().toString() } 
      });
      document.getElementById('input_todo').value = '';
    }
  }

  render() {
    return (
      <Fragment>
        <UserControl />
        <div className="input_wrap">
          <input 
            id="input_todo" 
            onKeyDown={this.addTodoOnKey} 
            placeholder="What do you need to do?"
            autoComplete="off"
          />
          <p>{this.props.counter}</p>
          <button className="add_todo_btn" onClick={this.addTodo}>
            <span className="horizontal"></span>
            <span className="vertical"></span>
          </button>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo_app: {
      todos: state.todo_app.todos,
      user: state.todo_app.user
    }
  }
}

export default connect(mapStateToProps)(EnterTodo);