/* getRevValue returns the _rev value of the given doc.
* The _rev value is the current revision of a document.
*
*/
function getRevValue(doc) {
  console.log(`doc is : ${JSON.stringify(doc)}`);
  if (!doc) {
    return false;
  }
  const revField = '_rev';
  const revId = doc[revField];
  return revId;
}
export default getRevValue;
