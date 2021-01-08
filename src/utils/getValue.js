/* getValue returns the value within doc of the left (1) or right (2) doc at the
* specified key. doc is the object that either contains an array of two objects
* or another object. Keys is an array that initially contains the path from root
* to the key for which we want the value. leftOrRight is what determines which
* index to get the value from. specialCase is a boolean that refers to a case
* in which the entire doc must be returned
*/
function getValue(doc, keys, leftOrRight) {
  console.log(`getValue called on ${leftOrRight} with keys: ${keys}`);
  console.log(`doc is : ${JSON.stringify(doc)}`);
  if (keys.length > 1) {
    keys.shift()
    return getValue(doc, keys, leftOrRight)
  }
  return doc[keys[0]][leftOrRight]
}

export default getValue;
