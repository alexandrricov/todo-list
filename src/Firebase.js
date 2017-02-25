import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBPGYvW8CN4n1Oviv3wWA3rWkoE_k5-1Io",
  authDomain: "todo-list-159611.firebaseapp.com",
  databaseURL: "https://todo-list-159611.firebaseio.com",
  storageBucket: "todo-list-159611.appspot.com",
  messagingSenderId: "345802305660"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();

export default class Firebase {
  static userObject = null;

  static get user() {
    return this.userObject;
  }

  static set user(newUser) {
    this.userObject = newUser
  }

  static signIn() {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        resolve({
          token: result.credential.accessToken,
          email: result.user.email,
          displayName: result.user.displayName,
        });
      }).catch(reject);
    });
  }

  static signOut() {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(resolve, reject);
    });
  }

  static listenItems(changeCallback) {
    const rootRef = firebase.database().ref('items');
    rootRef.on('value', snap => {
      changeCallback(snap.val());
    });
  }

  static addItem(text) {
    const ref = firebase.database().ref('items');
    const newChildRef = ref.push();
    return newChildRef.set({
      isDone: false,
      title: text,
      date: (new Date()).toISOString(),
    });
  }

  static removeItem(id) {
    return firebase.database().ref('items/' + id).remove();
  }

  static updateItem(id, fields) {
    return firebase.database().ref('items/' + id).update(fields)
  }
};
