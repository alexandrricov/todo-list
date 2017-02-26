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
  static checkLogged() {
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      return currentUser;
    } else {
      for (let key in localStorage) {
        if (key.startsWith("firebase:authUser:")) {
          try {
            return JSON.parse(localStorage.getItem(key));
          } catch (e) {
            console.error(e);

            return null;
          }
        }
      }

      return null;
    }
  }

  static signIn() {
    const user = Firebase.checkLogged();

    if (user) {
      return Promise.resolve(user);
    }

    return firebase.auth().signInWithPopup(provider)
      .then(result => result.user)
      .catch(console.error);
  }

  static signOut() {
    return firebase.auth().signOut()
      .catch(console.error);
  }

  static listenItems(changeCallback) {
    const ref = firebase.database().ref('items');
    ref.on('value', snap => {
      changeCallback(snap.val());
    });
  }

  static addItem(fields) {
    const ref = firebase.database().ref('items');
    const newChildRef = ref.push();

    return newChildRef.set(fields)
      .catch(console.error);
  }

  static removeItem(id) {
    return firebase.database().ref('items/' + id).remove()
      .catch(console.error);
  }

  static updateItem(id, fields) {
    return firebase.database().ref('items/' + id).update(fields)
      .catch(console.error);
  }
};
