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
        <label className="AddTodo__heading" htmlFor="addTodo">Add todo</label>
        <div className="AddTodo__inputWrapper">
          <input type="text" value={this.state.text} onChange={this.onTextEnter}  className="AddTodo__input" id="addTodo" />
          <button type="submit">add</button>
        </div>
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
