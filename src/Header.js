import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './reducers/auth';
import './Header.css';

const User = ({ user }) => (
  <div className="Header__user">
    <img src={user.photoURL} alt={user.displayName} className="Header__user-icon"/>
    <div>
      <div>{user.displayName}</div>
      <div>{user.email}</div>
    </div>
  </div>
);

class Header extends PureComponent {
  render() {
    const { user } = this.props.auth;

    return (
      <header className="Header__container">
        { user
          ? <User user={user} />
          : null
        }
        { user
          ? <button onClick={this.props.signOut} className="Header__button">Sign out</button>
          : <button onClick={this.props.signIn} className="Header__button">Sign in</button>
        }
      </header>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  { signIn, signOut },
)(Header);
