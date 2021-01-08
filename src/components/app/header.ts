/**
* @name app/header.ts
* orig: The Original JSON document to be displayed.
* docA: The first JSON document to be compared.
* docB: The second JSON document to be compared.
* selectedDoc: the ID of the document in Couch.  This is used as a unique key for the Component.
* acceptFinalButtonText: caller's desired text for the final button
* changeRevisedDataForCaller: the final button will call this callback function to send the final
* revised data back to the caller.
*/

export interface AppProps {
  orig: object
  docA: object
  docB: object
  selectedDoc: number
  acceptFinalButtonText: string
  changeRevisedDataForCaller: Function
}
