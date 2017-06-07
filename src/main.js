// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import TodoApp from './TodoApp';

const appRoot = document.getElementById('app-body');

const TodoAppModel = (() => {
  let listener = () => {};
  let state = {
    todoList: [],
    completedList: [],
  };
  const updateState = (newState) => {
    state = Object.assign({}, state, newState);
    listener();
  };
  return {
    setListener: (callback: Function) => {
      listener = callback;
    },
    getState: () => state,
    addTodo: (item: string) => {
      updateState({
        todoList: state.todoList.concat(item),
      });
    },
    completeTodo: (index: number) => {
      updateState({
        todoList: R.remove(index, 1, state.todoList),
        completedList: state.completedList.concat(state.todoList[index]),
      });
    },
    unfinishTodo: (index: number) => {
      updateState({
        completedList: R.remove(index, 1, state.completedList),
        todoList: state.todoList.concat(state.completedList[index]),
      });
    },
  };
})();

const render = () => {
  ReactDOM.render(<TodoApp state={TodoAppModel.getState()} actions={TodoAppModel} />, appRoot);
};

TodoAppModel.setListener(render);

// Start the app
render();
