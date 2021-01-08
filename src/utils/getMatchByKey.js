/* getMatchByKey returns the match boolean value for a path to a specified key in a document.
* doc is the delta document returned from little-differ that will contain a match tag for each
* key indicating whether or not the key was a match among both documents.
* Keys is an array that initially contains the path from root
* to the key for which we want the value.
* The function calls itself recursively as it steps through the keys.
* If a key is not found in a document, they function will return false for a mismatch.
*/
function getMatchByKey(doc, keys) {
  if (!doc) {
    return false;
  }

  if (keys.length > 1) {
    // shift removes first item in array
    keys.shift();
    return getMatchByKey(doc[keys[0]], keys)
  }

  if (Array.isArray(doc)) {
    const lastValue = doc[0];
    return lastValue.match;
  }
  return getMatchByKey(doc[keys[0]], keys);
}

export default getMatchByKey;
