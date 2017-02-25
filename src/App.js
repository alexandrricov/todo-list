import React, { PureComponent } from 'react';
import Header from './Header';
import AddTodo from './AddTodo';
import Todo from './Todo';
import Firebase from './Firebase';

import './App.css';

class App extends PureComponent {
  state = {
    itemsById: {},
    itemIds: [],
    user: null,
  };

  componentDidMount() {
    Firebase.listenItems(response => {
      const itemsById = {};
      const itemIds = [];

      Object.keys(response).forEach(key => {
        const item = response[key];
        itemsById[key] = {
          title: item.title,
          isDone: item.isDone,
        };

        itemIds.push(key);
      });

      this.setState({ itemsById, itemIds });
    });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AddTodo />
        <ul>
          { this.state.itemIds.map(itemId =>
            <Todo key={itemId} {...this.state.itemsById[itemId]} id={itemId} />) }
        </ul>
      </div>
    );
  }
}

export default App;
