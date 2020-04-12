import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../Utils/Firebase';
import { AuthUserContext } from '../Utils/Session';
import * as ROUTES from '../../routes';
// import './App.css';

import Navigation from '../Navigation';
import Home from '../Home';
import SignUpPage from '../Signup';
import SignInPage from '../Signin';
import PasswordForgotPage from '../PasswordForgot';
import DashboardPage from '../Dashboard';
import SettingPage from '../Settings';

import AdminPage from '../Admin';

export default class App extends Component {
  static contextType = FirebaseContext

  state = {
    authUser: null,
    loading: true,
  }

  componentDidMount() {
    const firebase = this.context

    this.listener = firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser, loading: false })
        : this.setState({ authUser: null, loading: false })
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  render() {
    const { authUser, loading } = this.state
    // Logged out users only
    const PublicRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (!authUser ? <Component {...props} /> : <Redirect to={ROUTES.DASHBOARD} />)}
      />
    )

    // Logged in users only
    const ProtectedRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (!!authUser ? <Component {...props} /> : <Redirect to={ROUTES.SIGN_IN} />)}
      />
    )

    // Admin only
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props => (!!authUser ? <Component {...props} /> : <Redirect to={ROUTES.SIGN_IN} />)}
      />
    )
    
    return (
      <AuthUserContext.Provider value={authUser}>
        {loading ? (
          <div className ="d-flex justify-content-center">
            <div className ="spinner-grow text-danger" role="status"><span className ="sr-only">Loading...</span></div>
            <div className ="spinner-grow text-warning" role="status"><span className ="sr-only">Loading...</span></div>
            <div className ="spinner-grow text-success" role="status"><span className ="sr-only">Loading...</span></div>
          </div>
        ) : (
          <Router>
            <Navigation />
            <Switch>
              <Route exact path={ROUTES.LANDING} component={Home} />
              <PublicRoute path={ROUTES.SIGN_UP} component={SignUpPage} />
              <PublicRoute path={ROUTES.SIGN_IN} component={SignInPage} />
              <PublicRoute path={ROUTES.PASSWORD_FORGET} component={PasswordForgotPage} />
              <ProtectedRoute path={ROUTES.DASHBOARD} component={DashboardPage} />
              <ProtectedRoute path={ROUTES.SETTING} component={SettingPage} />
              <PrivateRoute path={ROUTES.ADMIN} component={AdminPage} />
            </Switch>
          </Router>
        )}
      </AuthUserContext.Provider>
    )
  }
}
