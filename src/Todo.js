import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { removeItem, toggleDone, updateItemTitle } from './reducers/items';
import './Todo.css';

const ViewItem = ({ title, toggleDone, toggleEdit, userCanEdit }) => (
  <div className="ViewItem__container">
    <div onClick={toggleDone} className="ViewItem__title">{title}</div>
    { userCanEdit && <button onClick={toggleEdit}>edit</button> }
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

  save = (e) => {
    e.preventDefault();
    this.props.updateItemTitle(this.state.editTitle);
  };

  render() {
    return (
      <form onSubmit={this.save} className="EditItem__container">
        <input type="text" value={this.state.editTitle} onChange={this.editTitle} className="EditItem__input" />
        <button type="submit">save</button>
        <button type="reset" onClick={this.props.toggleEdit}>cancel</button>
      </form>
    )
  }
}

class Todo extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    isDone: PropTypes.bool,
    id: PropTypes.string,
  };

  state = {
    isEdit: false,
  };

  toggleDone = () => {
    const { toggleDone, id, isDone, userUID } = this.props;

    const userCanEdit = !!userUID;

    if (userCanEdit) {
      toggleDone(id, !isDone);
    }
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      isEdit: !prevState.isEdit,
    }));
  };

  removeItem = () => {
    this.props.removeItem(this.props.id);
  };

  updateItemTitle = (newTitle) => {
    this.props.updateItemTitle(this.props.id, newTitle)
      .then(this.toggleEdit);
  };

  render() {
    const { item, id, user } = this.props;

    const uid = user ? user.uid : null;
    const userCanEdit = !!uid && uid === item.uid;

    return (
      <li style={{ textDecoration: item.isDone ? 'line-through' : '' }} className="Todo__container">
        { this.state.isEdit
          ? <EditItem id={id} title={item.title} updateItemTitle={this.updateItemTitle} toggleEdit={this.toggleEdit} />
          : <ViewItem title={item.title} toggleDone={this.toggleDone} toggleEdit={this.toggleEdit} userCanEdit={userCanEdit} />
        }
        { userCanEdit && <button onClick={this.removeItem}>remove</button> }
      </li>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user,
  }),
  { removeItem, toggleDone, updateItemTitle },
)(Todo);
