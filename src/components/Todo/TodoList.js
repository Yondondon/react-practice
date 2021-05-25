import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';

class TodoList extends Component {
  //complete todo item
  handleComplete = (e) => {
    const item_id = e.target.parentNode.getAttribute('list_id');
    let index = this.props.todo_app.todos.findIndex(elem => elem.id === item_id);
    this.props.dispatch({ type: "COMPLETE_TODO", payload: index});
  }

  //uncomplete todo item
  handleUncomplete = (e) => {
    const item_id = e.target.parentNode.getAttribute('list_id');
    let index = this.props.todo_app.completed_todos.findIndex(elem => elem.id === item_id);
    this.props.dispatch({ type: "UNCOMPLETE_TODO", payload: index});
  }

  //delete todo item
  handleDeleteTodo = e => {
    const item_id = e.target.parentNode.getAttribute('list_id');
    let temp_obj = {};
    temp_obj = {
      todos: this.props.todo_app.todos.filter(elem => elem.id !== item_id),
      completed_todos: this.props.todo_app.completed_todos.filter(elem => elem.id !== item_id)
    }
    this.props.dispatch({ type: "REMOVE_TODO", payload: temp_obj});
  }

  render() {
    return (
      <Fragment>
        {/* A list of todos */}
        <ul className="todo_list">
          {
            this.props.todo_app.todos.length > 0 && this.props.todo_app.todos.map(item => {
              return (<li list_id={item.id} key={item.id}>
                <span>{item.text}</span>
                <button className="todo_control_button" onClick={this.handleComplete}><i className="far fa-check-circle"></i></button>
                <button className="todo_delete_button" onClick={this.handleDeleteTodo}><i className="fas fa-times-circle"></i></button>
              </li>)
            })
          }
        </ul>
        {/* A list of completed todos */}
        <ul className="completed_list">
          {
            this.props.todo_app.completed_todos.length > 0 && this.props.todo_app.completed_todos.map(item => {
              return (<li list_id={item.id} key={item.id}>
                <span>{item.text}</span>
                <button className="todo_control_button" onClick={this.handleUncomplete}><i className="fas fa-check-circle"></i></button>
                <button className="todo_delete_button" onClick={this.handleDeleteTodo}><i className="fas fa-times-circle"></i></button>
              </li>)
            })
          }
        </ul>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    todo_app: {
      todos: state.todo_app.todos,
      completed_todos: state.todo_app.completed_todos
    },
  }
}

export default connect(mapStateToProps)(TodoList);