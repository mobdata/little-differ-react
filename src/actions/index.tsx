// src/actions/index.tsx

export type Action = {
  type: 'UPDATE_NEW_DOC',
  newDoc: object,
} | {
  type: 'ADD_TO_DOC',
  keysToAdd: Array<string>,
  valueToAdd: object,
}

export const updateNewDoc = (doc: object): Action => ({
  type: 'UPDATE_NEW_DOC',
  newDoc: doc,
})

export const addToDoc = (newKeys: Array<string>, newVal: object): Action => ({
  type: 'ADD_TO_DOC',
  keysToAdd: newKeys,
  valueToAdd: newVal,
})
