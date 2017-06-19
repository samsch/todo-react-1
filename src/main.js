// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import TodoApp from './TodoApp';

export type Item = {
  description: string,
  id: string,
}

const appRoot = document.getElementById('app-body');

const createItem = (description: string, id: string) => ({ description, id });
const updateItem = (description: string, item: Item) => ({ id: item.id, description });

const TodoAppModel = (() => {
  let listener = () => {};
  let state = {
    todoList: [],
    completedList: [],
    nextItemId: 0,
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
        todoList: state.todoList.concat(createItem(item, String(state.nextItemId))),
        nextItemId: state.nextItemId + 1,
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
    modifyTodo: (index: number, newText: string, completed: boolean = false) => {
      const list = completed ? 'completedList' : 'todoList';
      updateState({
        [list]: R.update(index, updateItem(newText, state[list][index]), state[list]),
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
