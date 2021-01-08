/**
* @name app/header.ts
*/

export interface AppProps {
  orig: object // The Original JSON document to be displayed.
  docA: object // The first JSON document to be compared.
  docB: object // The second JSON document to be compared.
  updatedSrc: object
  acceptFinalButtonText: string
  changeRevisedDataForCaller: Function
}

export interface AppState {
  updatedSrc: object // The new JSON document to be constructed.
}
