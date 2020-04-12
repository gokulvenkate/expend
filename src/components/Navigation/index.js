import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Utils/Session';
import * as ROUTES from '../../routes';
import SignOutButton from '../SignOut';

class Navigation extends Component {
  static contextType = AuthUserContext

  render() {
    const authUser = this.context

    return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
  }
}

const NavigationAuth = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    {/* <a className="navbar-brand" href="https://github.com">Navbar</a> */}
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to={ROUTES.LANDING}>Landing <span className ="sr-only">(current)</span></Link>
        </li>
        <li className ="nav-item">
          <Link className="nav-link" to={ROUTES.DASHBOARD}>Dashboard</Link>
        </li>
        <li className ="nav-item">
          <Link className="nav-link" to={ROUTES.SETTING}>Setting</Link>
        </li>
        <li className ="nav-item">
          <Link className="nav-link" to={ROUTES.ADMIN}>Admin</Link>
        </li>
      </ul>
    </div>
    <SignOutButton />
  </nav>
)

const NavigationNonAuth = () => (
  <nav className ="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className ="navbar-brand" href="https://github.com">Navbar</a>
    <button className ="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className ="navbar-toggler-icon"></span>
    </button>
    <div className ="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className ="navbar-nav mr-auto">
        <li className ="nav-item active">
          <Link className="nav-link" to={ROUTES.LANDING}>Landing <span className ="sr-only">(current)</span></Link>
        </li>
        <li className ="nav-item">
          <Link className="nav-link" to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
        <li className ="nav-item">
          <Link className="nav-link" to={ROUTES.SIGN_UP}>Sign Up</Link>
        </li>
      </ul>
    </div>
  </nav>
)

export default Navigation
