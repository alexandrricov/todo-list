import React, { PropTypes, PureComponent } from 'react';
import Firebase from './Firebase';
import './App.css';

const ViewItem = ({ title, toggleDone, toggleEdit }) => (
  <div>
    <div onClick={toggleDone}>{title}</div>
    <button onClick={toggleEdit}>edit</button>
  </div>
);

class EditItem extends PureComponent {
  state = {
    editTitle: '',
  };

  componentDidMount() {
    this.setState({
      editTitle: this.props.title,
    })
  }

  editTitle = e => {
    this.setState({
      editTitle: e.target.value,
    })
  };

  save = () => {
    Firebase.updateItem(this.props.id, {
      title: this.state.editTitle,
    })
      .then(this.props.toggleEdit)
      .then(console.info)
      .catch(console.error);
  };

  render() {
    return (
      <form onSubmit={this.save}>
        <input type="text" value={this.state.editTitle} onChange={this.editTitle} />
        <button type="submit">save</button>
        <button type="reset" onClick={this.props.toggleEdit}>cancel</button>
      </form>
    )
  }
}

export default class Todo extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    isDone: PropTypes.bool,
    id: PropTypes.string,
  };

  state = {
    isEdit: false,
  };

  toggleDone = () => {
    Firebase.updateItem(this.props.id, {
      isDone: !this.props.isDone,
    })
      .then(console.info)
      .catch(console.error);
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
    }));
  };

  removeItem = () => {
    Firebase.removeItem(this.props.id)
      .then(console.info)
      .catch(console.error);
  };

  render() {
    const { title, isDone, id } = this.props;

    return (
      <li style={{ textDecoration: isDone ? 'line-through' : '' }}>
        { this.state.isEdit
          ? <EditItem id={id} title={title} toggleEdit={this.toggleEdit} />
          : <ViewItem title={title} toggleDone={this.toggleDone} toggleEdit={this.toggleEdit} />
        }
        <button onClick={this.removeItem}>remove</button>
      </li>
    );
  }
}
