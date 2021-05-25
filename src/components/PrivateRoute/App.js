import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({component: Component, user: user, ...rest}) => {
    // let isUser = rest.isUser;

    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route {...rest} render={props => (
            user.isUser ?
                <Component {...props} />
            : <Redirect to="/login/" />
        )} />
    );
};

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(PrivateRoute);