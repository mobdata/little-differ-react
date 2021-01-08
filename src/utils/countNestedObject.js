function countNestedObject(obj, whichDoc) {
  const result = [];

  let tempArray = [];

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    if (Array.isArray(value) && value[0].match !== undefined) {
      const keyValue = value[whichDoc]
      if (keyValue !== null) {
        if (typeof keyValue[key] === 'object') {
          result.push(key);
          tempArray = countNestedObject(value[whichDoc], whichDoc);
          result.push(...tempArray);
        } else {
          result.push(key);
        }
      }
    } else if (!Array.isArray(value) && value !== null && typeof value === 'object') {
      result.push(key);
      tempArray = countNestedObject(value, whichDoc);
      result.push(...tempArray);
    }
  })
  return result;
}

export default countNestedObject;
