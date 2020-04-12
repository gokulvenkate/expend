import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FirebaseContext } from '../Utils/Firebase';
import * as ROUTES from '../../routes';

class SignInForm extends Component {
  static contextType = FirebaseContext

  initialState = {
    email: '',
    password: '',
    error: null,
  }

  state = this.initialState

  onSubmit = event => {
    const firebase = this.context
    const { email, password } = this.state
    const { history } = this.props

    firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...this.initialState })
        history.push(ROUTES.DASHBOARD)
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''

    return (
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} name="email" onChange={this.onChange} placeholder="Email Address" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" value={password} name="password" onChange={this.onChange} placeholder="Password" />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isInvalid}>Sign In</button>
        {error && <p>{error.message}</p>}
      </form>
    )
  }
}

export default withRouter(SignInForm)
