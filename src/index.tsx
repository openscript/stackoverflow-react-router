import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Redirect, Route} from "react-router";

const publicComponent = () => (
    <p>public</p>
);

const loginComponent = () => (
    <p>login</p>
);

const protectedComponent = () => (
    <p>protected</p>
);

const ProtectedRoute = ({component: Component, isAuthenticated, ...attributes}) => {
    return <Route
        {...attributes}
        render={props => isAuthenticated
            ? <Component {...props} />
            : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
};

ReactDOM.render((
    <Router>
        <div>
            <Route exact path='/' component={publicComponent} />
            <ProtectedRoute path='/protected' isAuthenticated={false} component={protectedComponent} />
            <Route path='/login' component={loginComponent} />
        </div>
    </Router>
), document.getElementById('app'));