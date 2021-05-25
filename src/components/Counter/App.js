import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    document.title = 'Counter React App';
  }

  increment = () => {
    this.props.dispatch({ type: "INCREMENT" });
  }

  decrement = () => {
    this.props.dispatch({ type: "DECREMENT" });
  }

  render() {
    return (
      <Fragment>
        <Link to={'/projects'} className="back_to_home_link">
          <i className="fas fa-angle-left"></i>
          <span className="back_to_home_link__text">Back</span>
        </Link>
        <div id="counter">
          <button onClick={ this.decrement }id="counter_minus">-</button>
          <span id="counter_number">{this.props.counter}</span>
          <button onClick={ this.increment }id="counter_plus">+</button>
        </div>
        <div>
          <button onClick={ this.sendRequest }>Send Request</button>
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}


export default connect(mapStateToProps)(App);
