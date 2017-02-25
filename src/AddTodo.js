import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { addItem } from './reducers/items';
import './AddTodo.css';

class AddTodo extends PureComponent {
  state = {
    text: '',
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.addItem(this.state.text);
    this.setState({ text: '' })
  };

  onTextEnter = e => {
    this.setState({
      text: e.target.value,
    })
  };

  render() {
    const { user } = this.props.auth;

    if (!user) {
      return null;
    }

    return (
      <form onSubmit={this.onSubmit} className="AddTodo__form">
        <input type="text" value={this.state.text} onChange={this.onTextEnter}  className="AddTodo__input" />
        <button type="submit">add</button>
      </form>
    );
  }
}

export default connect(
  state => ({
    auth: state.auth,
  }),
  { addItem },
)(AddTodo);
