import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const configuration = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

export default class Firebase {
  constructor() {
    app.initializeApp(configuration)

    this.auth = app.auth();
    this.db = app.firestore();
  }
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doSignOut = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password)

  user = uid => this.db.ref(`users/${uid}`)

  users = () => this.db.collection('/spendings').doc('/spendings');

  spentItems = () => this.db.collection('/spendings').doc('/spendings');

}
