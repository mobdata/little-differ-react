import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { sortByKey } from '@mobdata/little-differ'

import { Action } from '../actions/index';

const initialState = {
  value: {},
}

/*
addToDoc adds the key and value pair to the doc. This doc is returned as
*newDoc in addPair. The final doc is then updated with any new key/value pairs
*/
export function addToDoc(keys: Array<string>, value: object, doc: object) : Object {
  /*
   *currentKey is created to track which key the function is targeting.
   *shift() assigns the first value from keys as the currentKey. Remember,
   *keys is constantly being sliced as it goes down a path, so the current key
   *is always the first element
   */
  /*
   *This first if statement checks where one is when they have clicked on
   *an element in the module. Specifically, this check is when one chooses an
   *element that is at the end of a nest.
   */
  const currentKey = keys.shift()
  if (keys.length < 1) {
    return sortByKey({ ...doc, [currentKey]: Object.values(value)[0] })
  }
  if (doc[currentKey]) {
    return { ...doc, [currentKey]: addToDoc(keys, value, doc[currentKey]) }
  }
  return { ...doc, [currentKey]: addToDoc(keys, value, {}) }
}

export function reducers(state = initialState, action: Action) {
  const { value } = state
  switch (action.type) {
    case 'ADD_TO_DOC':
      return { ...state, value: addToDoc(action.keysToAdd, action.valueToAdd, value) };
    case 'UPDATE_NEW_DOC':
      return { ...state, value: action.newDoc };
    default:
      return state;
  }
}
