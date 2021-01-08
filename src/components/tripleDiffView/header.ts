/**
* @name tripleDiffView/header.ts
* @author Marita Carballo
* @description This file defines the type interfaces for the TripleDiffView component,
* which can optionally accept arguments for both props and state. There is also
* the Path interface, which defines an object containing metadata regarding the
* paths to unique values within a JSON document.
*
* doc - the Diffed JSON document to be displayed as a list
* addPair - Function that calls the handleAddPair dispatcher
* displayDoc - indicates 0, 1, or 2 for which document is being displayed, primarily used in
*              creating unique ids for each nodeItem
* addToEqualValues - as the tripleDiffView steps through each element in a document, this function
*                    is called for all equalValues (among all 3 versions of the document) in order
*                    to initialize the Revised Doc in the lower panel.
*/

export interface TripleDiffProps {
  doc: object
  addPair: Function
  displayDoc: number
  addToEqualValues: Function
}

export interface State {

}
