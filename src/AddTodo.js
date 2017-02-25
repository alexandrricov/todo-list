import React, { PureComponent } from 'react';
import Firebase from './Firebase';

export default class AddTodo extends PureComponent {
  state = {
    text: '',
  };

  onSubmit = e => {
    e.preventDefault();
    Firebase.addItem(this.state.text)
      .then(console.info)
      .catch(console.error);
    this.setState({ text: '' })
  };

  onTextEnter = e => {
    this.setState({
      text: e.target.value,
    })
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.text} onChange={this.onTextEnter}/>
        <button type="submit">add</button>
      </form>
    );
  }
}
