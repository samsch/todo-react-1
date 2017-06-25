// @flow
import React from 'react';
import EditableItem from './EditableItem';

import type { Item } from './main.js';

type Props = {
  state: {
    todoList: Array<Item>,
    completedList: Array<Item>,
  },
  actions: {
    addTodo: Function,
    completeTodo: Function,
    unfinishTodo: Function,
    modifyTodo: Function,
    deleteTodo: Function,
  },
  clearData: Function,
}

type State = {
  newItemText: string,
}

class TodoApp extends React.Component {
  props: Props
  state: State
  addItem: Function
  constructor(props: Object) {
    super(props);
    this.state = {
      newItemText: '',
    };
    this.addItem = this.addItem.bind(this);
  }
  addItem(e: Event) {
    e.preventDefault();
    if(!this.state.newItemText) {
      return false;
    }
    this.props.actions.addTodo(this.state.newItemText);
    this.setState({
      newItemText: '',
    });
  }
  render() {
    return (
      <div className="todo-app">
        <h1>ToDo App - React</h1>
        <form onSubmit={this.addItem} className="new-todo-form">
          <input type="text" value={this.state.newItemText} onChange={e => { this.setState({ newItemText: e.target.value }); }} />
          <button type="submit">Add Item</button>
        </form>
        <ul className="todo-list">
          {this.props.state.todoList.map((item, index) => (
            <li key={item.id} className="todo-item">
              <button className="item-delete-button" type="button" onClick={() => this.props.actions.deleteTodo(index, false)} title="Delete item">X</button>
              <button className="item-complete-button" type="button" onClick={() => this.props.actions.completeTodo(index)} >Done</button>
              <EditableItem value={item.description} onChange={newValue => this.props.actions.modifyTodo(index, newValue, false)} />
            </li>
          ))}
          {this.props.state.todoList.length === 0 ? <li className="empty">Nothing left to do. Add some above!</li> : null}
        </ul>
        <h3>Completed</h3>
        <ul className="todo-list">
          {this.props.state.completedList.map((item, index) => (
            <li key={item.id} className="todo-item todo-completed-item">
              <button className="item-delete-button" type="button" onClick={() => this.props.actions.deleteTodo(index)} title="Delete item">X</button>
              <button className="item-complete-button" type="button" onClick={() => this.props.actions.unfinishTodo(index)} >Undo</button>
              <EditableItem value={item.description} onChange={newValue => this.props.actions.modifyTodo(index, newValue, true)} />
            </li>
          ))}
          {this.props.state.completedList.length === 0 ? <li className="empty">Nothing finished yet.</li> : null}
        </ul>
        <footer>
          <button className="clear-persistence-button" type="button" onClick={this.props.clearData} >Clear persistant data and refresh</button>
        </footer>
      </div>
    );
  }
}

export default TodoApp;
