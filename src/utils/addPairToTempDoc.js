import { addToDoc } from '../reducers';

/* addPairToTempDoc builds the tempDoc.  The TempDoc will initialize the Revised doc in the
*bottom panel with all equal values among the original and both modified documents.
*/

function addPairToTempDoc(keys, value, currentTempDoc) {
  return addToDoc(keys.slice(1), value, currentTempDoc);
}

export default addPairToTempDoc;
