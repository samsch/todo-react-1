// @flow
import React from 'react';

type Props = {
  state: {
    todoList: Array<string>,
    completedList: Array<string>,
  },
  actions: {
    addTodo: Function,
    completeTodo: Function,
    unfinishTodo: Function,
  }
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
            <li key={item} className="todo-item"><button onClick={() => this.props.actions.completeTodo(index)} >Done</button> {item}</li>
          ))}
          {this.props.state.todoList.length === 0 ? <li className="empty">Nothing left to do. Add some above!</li> : null}
        </ul>
        <h3>Completed</h3>
        <ul className="todo-list">
          {this.props.state.completedList.map((item, index) => (
            <li key={item} className="todo-completed-item"><button onClick={() => this.props.actions.unfinishTodo(index)} >Undo</button> {item}</li>
          ))}
          {this.props.state.completedList.length === 0 ? <li className="empty">Nothing finished yet.</li> : null}
        </ul>
      </div>
    );
  }
}

export default TodoApp;
