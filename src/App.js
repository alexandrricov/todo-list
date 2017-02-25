import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { listenItems } from './reducers/items';
import Header from './Header';
import AddTodo from './AddTodo';
import Todo from './Todo';

import './App.css';

class App extends PureComponent {
  componentWillMount() {
    this.props.listenItems();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AddTodo />
        <ul className="App__items">
          { this.props.items.itemIds.map(itemId =>
            <Todo
              key={itemId}
              item={this.props.items.itemsById[itemId]}
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
    items: state.items,
  }),
  { listenItems },
)(App);
