/**
* @name mergePanels/component.tsx
* @author Sara Kim, Juliet Adams and Connor Bulakites
* @description This file defines the main React component which calls all other
* React components. This will be the public interface of the finished component.
*/

import * as React from 'react'
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { ScrollSyncPane } from 'react-scroll-sync';
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'

import { compareTripleJSON } from '@mobdata/little-differ/lib/tripleDiffer'

import * as actions from '../../actions'
import TripleDiffView from '../tripleDiffView/component'
import { MergeProps } from './header'
import addPairToTempDoc from '../../utils/addPairToTempDoc';
import getPathsArray from '../../utils/getPathsArray';
import getRevValue from '../../utils/getRevValue';
import store from '../../store'

/* MergePanelsComponent sets the state of the newDoc. newDoc is an object that is used to
 * store the elements that are added by the user
 */

let tempDoc = {};

class MergePanelsComponent extends React.PureComponent <MergeProps> {
  static handleAddPair(keys: Array<string>, value: object) {
    store.dispatch(actions.addToDoc(keys.slice(1), value));
  }

  static handleUpdateNewDoc(value: object) {
    store.dispatch(actions.updateNewDoc(value));
  }

  static updateTempDoc(newTempDoc: object) {
    tempDoc = newTempDoc;
    return tempDoc;
  }

  static addToEqualValues(keys: Array<string>, value: object) {
    MergePanelsComponent.updateTempDoc(addPairToTempDoc(keys, value, tempDoc));
  }

  /* the constructor re-initializes the tempDoc so that when LDR is called multiple times with
  * different docs, it will not hold onto the tempDoc from previous runs.
  */
  constructor(props: MergeProps) {
    super(props);
    tempDoc = {};
    MergePanelsComponent.handleUpdateNewDoc(tempDoc);
  }

  componentDidMount() {
    return MergePanelsComponent.handleUpdateNewDoc(tempDoc);
  }

  /* Render renders the original document, and it's updated versions that need merging, DocA,
  * and DocB.  It's displayed in a 3 panel merge showing the original in the middle.
  * The revised or merged doc is displayed in the bottom panel.  It also allows the
  * add, delete, and change functionality in the browser.
  *
  * Little Differ's compare triple JSON gets called.
  *
   */
  render() {
    const { orig, docA, docB } = this.props

    /* Calling little differ's compareTripleJSON to get our delta.
    The original doc will always go first in the parameter list, then the
    docA, and docB third.  Little-differ doesn't care about this order, but it matters
    here in correctly displaying the mods versus original.  The renderDiffView will check
    for which doc it's currently displaying with the prop displayDoc.
    */

    const tripleDelta = compareTripleJSON(orig, docA, docB);
    console.log('Triple diff: ' + JSON.stringify(tripleDelta)); // eslint-disable-line prefer-template
    const origDoc = 'orig';
    const modDoc = 'mod';
    const docARev = getRevValue(docA);
    const prevRev = getRevValue(orig);
    const docBRev = getRevValue(docB);

    return (
      <div>
        <ScrollSyncPane>
          <Card
            style={{
              width: '33rem',
              height: '35rem',
              border: '2px solid lightgrey',
              marginBottom: '15px',
              display: 'inline-block',
              overflow: 'auto',
              backgroundColor: 'white',
            }}
          >
            <CardHeader tag="h1">Revision: {docARev}</CardHeader>
            <CardBody>
              <Grid item className="docATriple">
                <TripleDiffView
                  doc={tripleDelta}
                  addPair={(key, value) => MergePanelsComponent.handleAddPair(key, value)}
                  displayDoc={2}
                  addToEqualValues={(key, value) => null}
                />
              </Grid>
            </CardBody>
          </Card>
        </ScrollSyncPane>
        <ScrollSyncPane>
          <Card
            style={{
              width: '33rem',
              height: '35rem',
              border: '2px solid lightgrey',
              marginBottom: '15px',
              display: 'inline-block',
              overflow: 'auto',
              backgroundColor: 'ivory',
            }}
          >
            <CardHeader tag="h1">Previous Revision: {prevRev}</CardHeader>
            <CardBody>
              <Grid item className="origTriple">
                <TripleDiffView
                  doc={tripleDelta}
                  addPair={
                  (key, value) => MergePanelsComponent.handleAddPair(key, value)
                  }
                  displayDoc={1}
                  addToEqualValues={
                  (key, value) => MergePanelsComponent.addToEqualValues(key, value)
                  }
                />
              </Grid>
            </CardBody>
          </Card>
        </ScrollSyncPane>
        <ScrollSyncPane>
          <Card
            style={{
              width: '33rem',
              height: '35rem',
              border: '2px solid lightgrey',
              marginBottom: '15px',
              display: 'inline-block',
              overflow: 'auto',
              backgroundColor: 'white',
            }}
          >
            <CardHeader tag="h1">Revision: {docBRev}</CardHeader>
            <CardBody>
              <Grid item className="docBTriple">
                <TripleDiffView
                  doc={tripleDelta}
                  addPair={(key, value) => MergePanelsComponent.handleAddPair(key, value)}
                  displayDoc={3}
                  addToEqualValues={(key, value) => null}
                />
              </Grid>
            </CardBody>
          </Card>
        </ScrollSyncPane>
      </div>
    )
  }
}

export default MergePanelsComponent;
