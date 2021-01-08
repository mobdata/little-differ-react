import Adapter from 'enzyme-adapter-react-16';// React 16 Enzyme adapter
import TestRenderer from 'react-test-renderer';

import addPairToTempDoc from '../utils/addPairToTempDoc';
import getPathsArray from '../utils/getPathsArray';
import getValue from '../utils/getValue';
import getRevValue from '../utils/getRevValue';
import getMatchByKey from '../utils/getMatchByKey';
import countNestedObject from '../utils/countNestedObject';

test('Test AddPairToTempDoc', () => {
  const currentTempDoc = { a: { b: 2, c: 3 }, j: [10, 9, 8] }

  const path = 'root.a.d';
  const keys = path.split('.')
  const originalKeys = keys.slice()

  const newValue = { d: 4 }
  const expectedResult = { a: { b: 2, c: 3, d: 4 }, j: [10, 9, 8] }

  const result = addPairToTempDoc(originalKeys, newValue, currentTempDoc)

  expect(JSON.stringify(result)).toEqual(JSON.stringify(expectedResult));
})

test('Test GetPathsArray', () => {
  const documentB3 = {
    a: {
      a: {
        a: {
          a: {
            a: 1,
            b: undefined,
            c2: 1,
            d: {
              e: [1, 2, 3],
              f: [4, 5, 6],
              g: [7, 8, 9],
            },
          },
        },
      },
    },
  }

  const expectedResult = ['root.a.a.a.a.a', 'root.a.a.a.a.b', 'root.a.a.a.a.c2', 'root.a.a.a.a.d.e.0',
    'root.a.a.a.a.d.e.1', 'root.a.a.a.a.d.e.2', 'root.a.a.a.a.d.f.0', 'root.a.a.a.a.d.f.1',
    'root.a.a.a.a.d.f.2', 'root.a.a.a.a.d.g.0', 'root.a.a.a.a.d.g.1', 'root.a.a.a.a.d.g.2'];

  const result = getPathsArray(documentB3, 'root');
  expect(result).toEqual(expectedResult);
})

test('Test CountNestedObject', () => {
  const nested = {"z":
                  {"a":[{"match":"allDiff"},{"a":1},null,null],
                   "b":[{"match":"allDiff"},{"b":2},null,null],
                   "c":[{"match":"allDiff"},{"c":3},null,null],
                   "d":[{"match":"allDiff"},{"d":4},null,null]}}

  const whichDoc = 1;
  const expectedResult = ['z', 'a', 'b', 'c', 'd'];

  const result = countNestedObject(nested, whichDoc);

  expect(result).toEqual(expectedResult);
})

test('Test CountNestedObject 2', () => {
  const nested = {"d":
                   {"e":[{"match":"allDiff"},null,null,{"e":[1,2,3]}],
                    "f":[{"match":"allDiff"},null,null,{"f":[4,5,6]}],
                    "g":[{"match":"allDiff"},null,null,{"g":[7,8,9]}]}}
  const whichDoc = 3;
  const expectedResult = ['d', 'e', 'f', 'g'];

  const result = countNestedObject(nested, whichDoc);
  expect(result).toEqual(expectedResult);
})

test('Test CountNestedObject 3', () => {
  const nested = {"j":[{"match":"modsMatch"},{"j":[10,9,8]},{"j":15},{"j":15}]}

  const whichDoc = 1;
  const expectedResult = ['j'];

  const result = countNestedObject(nested, whichDoc);
  expect(result).toEqual(expectedResult);
})


test('Test getValue', () => {
  const deltaDoc = { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c2": [{ "match": true }, { "c2": 1 }, { "c2": 1 }],
    "d": [{ "match": false }, { "d": true }, {
      "d": { "e": [{ "match": false }, null, { "e": [1, 2, 3] }],
      "f": [{ "match": false }, null, { "f": [4, 5, 6] }],
      "g": [{ "match": false }, null, { "g": [7, 8, 9] }] } }],
    "y": [{ "match": false }, { "y": [1, 2] }, null] }

  const expectedResult = { c2: 1 }

  const path = '1.root.a.a.a.a.c2';

  const keys = path.split('.')
  const leftOrRight = Number(keys.shift())
  const originalKeys = keys.slice()
  keys.shift() //remove first item in array

  const resultValue = getValue(deltaDoc, originalKeys, leftOrRight)

  expect(resultValue).toEqual(expectedResult);
})

test('Test getRevValue', () => {
  const original5 = {
    _rev: '1-zxc',
    a: {
      a: {
        a: {
          a: {
            z1: { a: 1, b: 2 },
          },
        },
      },
    },
  }

  const documentA5 = {
    _rev: '2-azxc',
    a: {
      a: {
        a: {
          a: {
            z: { a: 1, b: 2, d: 4 },
          },
        },
      },
    },
  }

  const documentB5 = {
    _rev: '2-bzxc',
    a: {
      a: {
        a: {
          a: {
            z: { a: 1, b: 2, c: 3, d: 4 },
            z1: { a: 1, b: 2 },
          },
        },
      },
    },
  }

  const expectedDocARev = '2-azxc';
  const expectedDocBRev = '2-bzxc';
  const expectedPrevRev = '1-zxc';

  const resultDocARev = getRevValue(documentA5)
  const resultDocBRev = getRevValue(documentB5);
  const resultPrevRev = getRevValue(original5);

  expect(resultDocARev).toEqual(expectedDocARev);
  expect(resultDocBRev).toEqual(expectedDocBRev);
  expect(resultPrevRev).toEqual(expectedPrevRev);
})

test('Test getMatch', () => {
  const deltaDoc = { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c2": [{ "match": true }, { "c2": 1 }, { "c2": 1 }],
    "d": [{ "match": false }, { "d": true }, {
      "d": { "e": [{ "match": false }, null, { "e": [1, 2, 3] }],
      "f": [{ "match": false }, null, { "f": [4, 5, 6] }],
    "g": [{ "match": false }, null, { "g": [7, 8, 9] }] } }],
    "y": [{ "match": false }, { "y": [1, 2] }, null] }

  const expectedResult = { match: true }

  const path = '1.root.a.a.a.a.c2';

  const keys = path.split('.')
  const matchLocation = 0;
  const originalKeys = keys.slice()
  keys.shift() //remove first item in array
  const resultValue = getValue(deltaDoc, originalKeys, matchLocation)

  expect(resultValue).toEqual(expectedResult);
})

test('Test getMatchByKey A', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.a';

  const keys = path.split('.');

  const expectedResult = true
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey B', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.b';

  const keys = path.split('.');

  const expectedResult = true
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})


test('Test getMatchByKey C', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.c';

  const keys = path.split('.');

  const expectedResult = false
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey C2', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.c2';

  const keys = path.split('.');

  const expectedResult = false
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey D', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.d';

  const keys = path.split('.');

  const expectedResult = true
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey H', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.h';

  const keys = path.split('.');

  const expectedResult = true
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey I', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.i';

  const keys = path.split('.');

  const expectedResult = false
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey Y', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] } } } } }

  const path = 'root.a.a.a.a.y';

  const keys = path.split('.');

  const expectedResult = false
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey i no nesting', () => {
  const deltaDoc = { "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": false }, null, { "c": false }],
    "c2": [{ "match": false }, { "c2": 1 }, null],
    "d": [{ "match": true }, { "d": true }, { "d": true }],
    "h": [{ "match": true }, { "h": "A&Orig match" }, { "h": "A&Orig match" }],
    "i": [{ "match": false }, { "i": "B&Orig match" }, { "i": "A has something new" }],
    "y": [{ "match": false }, { "y": [1, 2] }, { "y": 1 }] }

  const path = "i";

  const keys = path.split('.');

  const expectedResult = false;
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})

test('Test getMatchByKey z1-a ', () => {
  const deltaDoc = { "a": { "a": { "a": { "a": {
    "a": [{ "match": true }, { "a": 1 }, { "a": 1 }],
    "b": [{ "match": true }, {}, {}],
    "c": [{ "match": true }, { "c": false }, { "c": false }],
    "z": [{ "match": false }, null, { "z": { "a": [{ "match": false }, null, { "a": 1 }],
      "b": [{ "match": false }, null, { "b": 2 }],
      "d": [{ "match": false }, null, { "d": 4 }] } }],
    "z1": [{ "match": false }, { "z1": { "a": [{ "match": false }, { "a": 1 }, null],
    "b": [{ "match": false }, { "b": 2 }, null] } }, null] } } } } }


  const path = 'a.a.a.a.z1.a';

  const keys = path.split('.');

  const expectedResult = false;
  expect(getMatchByKey(deltaDoc, keys)).toEqual(expectedResult);
})
