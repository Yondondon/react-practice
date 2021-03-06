import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './index.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//components
import MainApp from './components/MainApp';
import TodoApp from './components/Todo/App';
import Projects from './components/Projects/App';


const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={MainApp} />
        <Route path='/todo' component={TodoApp} />
        <Route path='/projects' component={Projects} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
