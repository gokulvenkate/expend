import React, { Component } from 'react'
import { FirebaseContext } from '../Utils/Firebase'

export default class AdminPage extends Component {
  static contextType = FirebaseContext

  state = {
    loading: false,
    users: [],
  }

  componentDidMount() {
    const firebase = this.context

    this.setState({ loading: true })

    firebase.users().get().then( doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const usersObject = doc.data();
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }))

        this.setState({ loading: false, users: usersList })
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });
    // this.setState({ loading: false, users: spent_details })
    console.log(this.state)

  }

  componentWillUnmount() {
    const firebase = this.context

    // firebase.users().off()
    console.log('willunmount')
  }

  render() {
    const { users, loading } = this.state
    console.log('>',users)

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    )
  }
}

const UserList = ({ users }) => (
  <>
    {users.map(user => (
      <ul key={user.uid}>
        <li>
          <strong>ID:</strong> {user.uid}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Username:</strong> {user.username}
        </li>
      </ul>
    ))}
  </>
)
