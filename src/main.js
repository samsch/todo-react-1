// @flow
import React from 'react';
import ReactDOM from 'react-dom';

import TodoApp from './TodoApp';

console.log(TodoApp);

const appRoot = document.getElementById('app-body');

ReactDOM.render(<TodoApp />, appRoot);
