import React, { Component } from 'react';
import { FirebaseContext } from '../Utils/Firebase';

export default class Dashboard extends Component {
  static contextType = FirebaseContext

  state = {
    loading: false,
    spending: [],
  }

  componentDidMount() {
    const firebase = this.context

    this.setState({ loading: true })

    firebase.spentItems().get().then(doc => {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        const spendingObj = doc.data();
        console.log(Object.keys(spendingObj), spendingObj['spend_remarks'])
        const spentList = Object.keys(spendingObj).map(key => ({
          // ...spendingObj[key],
          // uid: key,
          spendingObj
        }))
        console.log(spentList)
        // this.setState({ loading: false, users: spentList })
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
    const { spending, loading } = this.state

    return (
      <div className="container">
        <h1>Dashboard</h1>
        {loading && <div>Loading ...</div>}
        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addSpentItems">Add Spent Items</button>
        <AddSpentItems />
        <SpentList spending={spending} />
      </div>
    )
  }
}

const SpentList = ({ spending }) => (
  <>
    {spending.map(spent => (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>spent</th>
            <th>Spent for</th>
            <th>Spent on</th>
          </tr>
        </thead>
        <tbody>
          <tr key={spent.uid}>
            <td>{spent.uid}</td>
            <td>{spent.uid}</td>
            <td>{spent.uid}</td>
          </tr>
        </tbody>
      </table>
    ))}
  </>
)


const AddSpentItems = () => (
  <div className="modal fade" id="addSpentItems" data-backdrop="static" role="dialog" aria-labelledby="addSpentItemsLabel" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addSpentItemsLabel">Add Spent Details</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="col-form-label">Recipient:</label>
              <input type="text" className="form-control" id="recipient-name" />
            </div>
            <div className="form-group">
              <label className="col-form-label">Message:</label>
              <textarea className="form-control" id="message-text"></textarea>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" className="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>
)