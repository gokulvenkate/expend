import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PasswordForgotForm from './PasswordForgotForm'

import * as ROUTES from '../../routes'

export default class PasswordForgotPage extends Component {
  render() {
    return (
      <div className="container">
        <h1>Forgot Password</h1>
        <PasswordForgotForm />
      </div>
    )
  }
}

const PasswordForgotLink = () => (
  <p className="lead pt-2">
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export { PasswordForgotForm, PasswordForgotLink }
