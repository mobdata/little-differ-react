// src/store/index.tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { reducers } from '../reducers'

const store = createStore(reducers);

export default store;
