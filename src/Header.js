import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from './reducers/auth';
import { listenItems, clearItems } from './reducers/items';
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

User.propTypes = {
  user: PropTypes.object,
};

class Header extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    signIn: PropTypes.func,
    signOut: PropTypes.func,
    listenItems: PropTypes.func,
    clearItems: PropTypes.func,
  };

  signIn = () => {
    this.props.signIn()
      .then(this.props.listenItems);
  };

  signOut = () => {
    this.props.signOut()
      .then(this.props.clearItems);
  };

  render() {
    const { user } = this.props;

    return (
      <header className="Header__container">
        { user
          ? <User user={user} />
          : null
        }
        { user
          ? <button onClick={this.signOut} className="Header__button">Sign out</button>
          : <button onClick={this.signIn} className="Header__button">Sign in</button>
        }
      </header>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user,
  }),
  { signIn, signOut, listenItems, clearItems },
)(Header);
