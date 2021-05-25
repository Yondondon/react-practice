import React from 'react';
import { Link } from 'react-router-dom';

//Components
import EnterTodo from './EnterTodo';
import TodoList from './TodoList';
// import UserControl from './UserControl';

//Styles
import './App.scss';

class App extends React.Component {
  componentDidMount() {
    document.title = 'TODO React App';
  }

  render() {
    return (
      <div className="todo_app__page_wrapper">
      <Link to={'/projects'} className="back_to_home_link">
        {/* <span className="icon-return"></span> */}
        <i className="fas fa-angle-left"></i>
        <span className="back_to_home_link__text">Back</span>
      </Link>
      <div className="todo_app__wrap">
        {/* <UserControl /> */}
        <EnterTodo />
        <TodoList />
      </div>
    </div>
    )
  }
}

export default App;