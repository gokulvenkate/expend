import React, { Component } from 'react';
import SignInForm from './SignInForm';
import { PasswordForgotLink } from '../PasswordForgot';
import { SignUpLink } from '../Signup';

export default class SignInPage extends Component {
  render() {
    return (
      <div className="container">
        <h1>Sign in</h1>

        <SignInForm />
        <PasswordForgotLink />
        <SignUpLink />
      </div>
    )
  }
}

export { SignInForm }
