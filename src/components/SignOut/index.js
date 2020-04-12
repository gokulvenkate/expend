import React, { Component } from 'react';
import { FirebaseContext } from '../Utils/Firebase';

class SignOutButton extends Component {
  static contextType = FirebaseContext

  render() {
    const firebase = this.context

    return (
      <button className="btn btn-outline-light" type="button" onClick={firebase.doSignOut}>
        Sign Out
      </button>
    )
  }
}

export default SignOutButton
