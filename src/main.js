// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import R from 'ramda';
import TodoApp from './TodoApp';

export type Item = {
  description: string,
  id: string,
}

type AppState = {
  todoList: Array<Item>,
  completedList: Array<Item>,
  nextItemId: number,
}

const appRoot = document.getElementById('app-body');

const createItem = (description: string, id: string): Item => ({ description, id });
const updateItem = (description: string, item: Item): Item => ({ id: item.id, description });

const saveState = (state: AppState): void => window.localStorage.setItem('todo-react-1.state', JSON.stringify(state));
// getItem returns a string or nothing.
const loadState = (): ?AppState => {
  try {
    return JSON.parse(window.localStorage.getItem('todo-react-1.state'));
  }
  catch(error) {
    // console.error('Caught error attempting to parse saved state. Data is probably corrupt.', error);
    return null;
  }
};

const clearData = () => {
  window.localStorage.clear();
  window.location.reload();
};

const TodoAppModel = (() => {
  let listener = () => {};
  // Directly merge a saved state onto the default state. If a key is missing
  // from the saved state, the default value will be used.
  let state: AppState = Object.assign({
    todoList: [],
    completedList: [],
    nextItemId: 0,
  }, loadState());

  const updateState = (newState) => {
    state = Object.assign({}, state, newState);
    listener();
    // Persist the state for every update. This has potential to become a
    // performance bottleneck, as localStorage is known to be fairly slow.
    // If problems are noticed, the easy solution is to throttle or debounce
    // calls. Likely would be done in the saveState function, rather than here.
    saveState(state);
  };
  return {
    // Allows a single subscriber to get called when the state is updated.
    // Ideally, this method (and the listener handling above) would allow
    // multiple listeners. If this was intended to scale, then the listener
    // would also accept a pointer to a specific part of the state to
    // observe, such that the subcription only fires if that part is updated.
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
    deleteTodo: (index: number, completed: boolean = true) => {
      const list = completed ? 'completedList' : 'todoList';
      updateState({
        [list]: R.remove(index, 1, state[list]),
      });
    },
  };
})();

const render = () => {
  ReactDOM.render(<TodoApp state={TodoAppModel.getState()} actions={TodoAppModel} clearData={clearData} />, appRoot);
};

TodoAppModel.setListener(render);

// Start the app
render();
