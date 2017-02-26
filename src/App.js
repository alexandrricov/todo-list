import React, { PropTypes, PureComponent } from 'react';
import { connect } from 'react-redux';
import { checkLogged } from './reducers/auth';
import { listenItems } from './reducers/items';
import Header from './Header';
import AddTodo from './AddTodo';
import Todo from './Todo';

import './App.css';

class App extends PureComponent {
  static propTypes = {
    itemsById: PropTypes.object,
    itemIds: PropTypes.array,
    checkLogged: PropTypes.func,
    listenItems: PropTypes.func,
  };

  componentWillMount() {
    this.props.checkLogged();
    this.props.listenItems();
  }

  render() {
    const { itemsById, itemIds } = this.props;

    return (
      <div className="App">
        <Header />
        <AddTodo />
        <ul className="App__items">
          { itemIds.map(itemId =>
            <Todo
              key={itemId}
              item={itemsById[itemId]}
              id={itemId}
            />)
          }
        </ul>
      </div>
    );
  }
}

export default connect(
  state => ({
    itemsById: state.items.itemsById,
    itemIds: state.items.itemIds,
  }),
  { checkLogged, listenItems },
)(App);
