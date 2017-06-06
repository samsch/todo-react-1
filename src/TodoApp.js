// @flow
import React from 'react';

type TodoItem = {
  text: string,
  done: boolean,
};

type State = {
  items: Array<TodoItem>,
  completedItems: Array<TodoItem>,
  newItemText: string,
}

const newTodo = function(text: string): TodoItem {
  return {
    done: false,
    text,
  }
};

class TodoApp extends React.Component {
  state: State
  addItem: Function
  finishItem: Function
  unfinishItem: Function
  constructor(props: Object) {
    super(props);
    this.state = {
      items: [],
      completedItems: [],
      newItemText: '',
    };
    this.addItem = this.addItem.bind(this);
    this.finishItem = this.finishItem.bind(this);
    this.unfinishItem = this.unfinishItem.bind(this);
  }
  addItem(e: Event) {
    e.preventDefault();
    this.setState((prev: State) => ({
      items: prev.items.concat(newTodo(this.state.newItemText)),
      newItemText: '',
    }));
  }
  finishItem(index: number) {
    this.setState((prev: State) => ({
      items: [...prev.items.slice(0, index), ...prev.items.slice(index + 1, prev.items.length)],
      completedItems: prev.completedItems.concat(prev.items[index]),
    }));
  }
  unfinishItem(index: number) {
    this.setState((prev: State) => ({
      items: prev.items.concat(prev.completedItems[index]),
      completedItems: [...prev.completedItems.slice(0, index), ...prev.completedItems.slice(index + 1, prev.completedItems.length)],
    }));
  }
  render() {
    return (
      <div>
        <h1>ToDo App - React</h1>
        <form onSubmit={this.addItem} className="new-todo-form">
          <input type="text" value={this.state.newItemText} onChange={e => { this.setState({ newItemText: e.target.value }); }} />
          <button type="submit">Add Item</button>
        </form>
        <ul className="todo-list">
          {this.state.items.map((item, index) => (
            <li className="todo-item"><button onClick={() => this.finishItem(index)} >Done</button> {item.text}</li>
          ))}
          {this.state.items.length === 0 ? <li className="empty">Nothing left to do. Add some above!</li> : null}
        </ul>
        <h3>Completed</h3>
        <ul className="todo-list">
          {this.state.completedItems.map((item, index) => (
            <li className="todo-completed-item"><button onClick={() => this.unfinishItem(index)} >Undo</button> {item.text}</li>
          ))}
          {this.state.completedItems.length === 0 ? <li className="empty">Nothing finished yet.</li> : null}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
