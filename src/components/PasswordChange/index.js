import React, { Component } from 'react'
import PasswordChangeForm from './PasswordChangeForm'

export default class PasswordChangePage extends Component {
  render() {
    return (
      <div>
        <h1>Change Password</h1>
        <PasswordChangeForm />
      </div>
    )
  }
}

export { PasswordChangeForm }
