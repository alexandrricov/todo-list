import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { removeItem, toggleDone, updateItemTitle } from './reducers/items';
import './Todo.css';

const ViewItem = ({ item, toggleDone, toggleEdit, userCanEdit }) => (
  <div className="ViewItem__container">
    <div
      onClick={toggleDone}
      className="ViewItem__title"
      style={{ textDecoration: item.isDone ? 'line-through' : '' }}
    >{item.title}</div>
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
    item: PropTypes.object,
    id: PropTypes.string,

    user: PropTypes.object,

    removeItem: PropTypes.func,
    toggleDone: PropTypes.func,
    updateItemTitle: PropTypes.func,
  };

  state = {
    isEdit: false,
  };

  canUserEdit() {
    const { item, user } = this.props;

    const uid = user ? user.uid : null;
    return !!uid && uid === item.uid;
  }

  toggleDone = () => {
    const { item, id } = this.props;

    const userCanEdit = this.canUserEdit();

    if (userCanEdit) {
      this.props.toggleDone(id, !item.isDone);
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
    const { item, id } = this.props;

    const userCanEdit = this.canUserEdit();

    return (
      <li className="Todo__container">
        <div className="Todo__wrapper">
          { this.state.isEdit
            ? <EditItem id={id} title={item.title} updateItemTitle={this.updateItemTitle} toggleEdit={this.toggleEdit} />
            : <ViewItem item={item} toggleDone={this.toggleDone} toggleEdit={this.toggleEdit} userCanEdit={userCanEdit} />
          }
          { userCanEdit && <button onClick={this.removeItem}>remove</button> }
        </div>
        { item.displayName && <div className="Todo__author">author: {item.displayName}</div> }
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
