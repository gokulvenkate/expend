import React, { Component } from 'react'
import { FirebaseContext } from '../Utils/Firebase'

export default class PasswordChangeForm extends Component {
  static contextType = FirebaseContext

  initialState = {
    password: '',
    passwordVerify: '',
    error: null,
  }

  state = this.initialState

  onSubmit = event => {
    const firebase = this.context
    const { password } = this.state

    firebase
      .doPasswordUpdate(password)
      .then(() => {
        this.setState({ ...this.initialState })
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
    const { password, passwordVerify, error } = this.state

    const isInvalid = password !== passwordVerify || password === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="New Password"
        />
        <input
          name="passwordVerify"
          value={passwordVerify}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm New Password"
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    )
  }
}
