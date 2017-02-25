import React, { PureComponent } from 'react';
import Firebase from './Firebase';


export default class Header extends PureComponent {
  state = {
    name: '',
    email: '',
    token: '',
  };

  signIn = () => {
    Firebase.signIn().then(({ token, displayName, email }) => {
      this.setState({
        token,
        name: displayName,
        email,
      })
    });
  };

  signOut = () => {
    Firebase.signOut()
      .then(this.setState({ name: '', email: '', token: '' }))
      .catch(error => console.error('An error happened on sign out', error));
  };

  // onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log('Name: ' + profile.getName());
  //   console.log('Image URL: ' + profile.getImageUrl());
  //   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  // signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }

  render() {
    return (
      <header>
        <button onClick={this.signIn}>Sign in</button>
        <button onClick={this.signOut}>Sign out</button>
        <div>{this.state.name}</div>
        <div>{this.state.email}</div>
      </header>
    );
  }
}
