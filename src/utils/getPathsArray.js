/* getPathsArray builds an array of all paths in the Doc provided.
*This is used when checking the "otherDoc" for keys the current doc might not have.
*For example: If the docA side is being compared between docA and the original, we build an
*array of all paths in DocB in order to allow for spacing on the A side when B has
*something that A does not (and vice versa).
*/

function getPathsArray(obj, name) {
  const result = [];

  let passName;
  let tempArray = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    passName = `${name}.${key}`;

    if (value !== null && typeof value === 'object') {
      tempArray = getPathsArray(value, passName);

      result.push(...tempArray);
    } else {
      result.push(passName);
    }
  })

  return result;
}

export default getPathsArray;
