/**
* @name index.tsx
* @author Connor Bulakites
* @description This file defines a component which is currently used for testing
* the main App component. It is referenced in the public index.html file.
*/

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import AppComponent from './components/app/component'

const simpleTest1 = { _rev: '2-zxc', a: 1, b: 2, c: 3, d: 4 }
const originalSimpleTest1 = { _rev: '1-asd', b: 2 }

const undefinedTest1 = { _rev: '2-zxc', a: 1 }
const originalUndefinedTest1 = { _rev: '1-asd', a: undefined }

const simpleNullTest1 = { _rev: '2-zxc', a: null, b: 123 }
const originalSimpleNullTest1 = { _rev: '1-asd', b: 123 }

const simpleMismatchTest1 = { _rev: '2-zxc', a: 1 }
const originalSimpleMismatchTest1 = { _rev: '1-asd', a: 2 }

const simpleMismatchTest2 = { _rev: '2-zxc', a: 1, b: 2, c: 3, d: 4, e: 5 }
const originalSimpleMismatchTest2 = { _rev: '1-asd', a: 2, b: 3, c: 4, d: 5, e: 6 }

const simpleMatchTest1 = { _rev: '2-zxc', a: 1, b: 2 }
const originalSimpleMatchTest1 = { _rev: '1-asd', a: 1, b: 2 }

const undefinedTest2 = {
  _rev: '2-zxc',
  a: undefined,
  b: undefined,
  c: undefined,
  d: undefined,
  e: undefined,
  f: undefined,
}
const originalUndefinedTest2 = { _rev: '1-asd', c: 1 }

const nestedMismatchTest1 = { _rev: '2-zxc', a: { b: 2 } }
const originalNestedMismatchTest1 = { _rev: '1-asd', a: { b: 3 } }

const nestedMismatchTest2 = { _rev: '2-zxc', a: { b: null } }
const originalNestedMismatchTest2 = { _rev: '1-asd', a: { b: 1 } }

const nestedMatchWithArrayTest1 = { _rev: '2-zxc', a: { b: 2, c: 3 }, j: [10, 9, 8] }
const nestedMisMatchWithArrayTest1 = { _rev: '2-zxc', a: { b: 2, c: 3 }, j: 15 }

const originalNestedMatchWithArrayTest1 = { _rev: '1-asd', a: { b: 2, c: 3 }, j: [10, 9, 8] }

const original2 = {
  _rev: '1-asd',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: true,
          e: 5,
          k: null,
          y: 1,
          z: { a: 1, b: 2, c: 3, d: 4 },
        },
      },
      j: [10, 9, 8],
    },
  },
  h: {
    i: false,
    m: true,
  },
}

const documentA2 = {
  _rev: '2-aqwe',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          c2: 1,
          d: true,
          e: 5,
          k: null,
          y: [1, 2],
          z: 1,
        },
      },
      j: [10, 9, 8],
    },
  },
  h: {
    i: false,
    m: true,
  },
}

const documentB2 = {
  _rev: '2-bqwe',
  a: {
    a: {
      a: {
        a: {
          a: true,
          c: false,
          d: {
            e: [1, 2, 3],
            f: [4, 5, 6],
            g: [7, 8, 9],
          },
          e: 5,
          k: 123,
        },
      },
      j: [10, 9, 8],
    },
  },
}

const documentA3 = {
  _rev: '1-asd',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: true,
          h: 'A&Orig match',
          i: 'A has something new',
          y: 1,
        },
      },
    },
  },
}

const original3 = {
  _rev: '2-awer',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c2: 1,
          d: true,
          h: 'A&Orig match',
          i: 'B&Orig match',
          y: [1, 2],
        },
      },
    },
  },
}

const documentB3 = {
  _rev: '2-bwer',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c2: 1,
          c3: 100,
          d: {
            e: [1, 2, 3],
            f: [4, 5, 6],
            g: [7, 8, 9],
          },
          h: 'B has something new',
          i: 'B&Orig match',
        },
      },
    },
  },
}

const original4 = {
  _rev: '1-sdf',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          z1: { a: 1, b: 2 },
        },
      },
    },
  },
}

const documentA4 = {
  _rev: '2-asdf',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          z: { a: 1, b: 2, d: 4 },
        },
      },
    },
  },
}

const documentB4 = {
  _rev: '2-bsdf',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: 2,
          z: { a: 1, b: 2, c: 3, d: 4 },
          z1: { a: 1, b: 2 },
        },
      },
    },
  },
}

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

// This render mimics how an LDR client will call LDR.  The client will have
// its own changeRevisedData handler or dispatch function to do with it what they please.
// Here we're just printing it to the console.

function changeRevisedDataForCaller(value: object) {
  // eslint-disable-next-line prefer-template
  console.log('Revised Data retrieved by caller: ' + JSON.stringify(value));
}

ReactDOM.render(

  <AppComponent
    orig={original3}
    docA={documentA3}
    docB={documentB3}
    selectedDoc={1}
    acceptFinalButtonText="Push Current Buffer(Change this text)"
    changeRevisedDataForCaller={(doc) => changeRevisedDataForCaller(doc)}
  />,
  document.getElementById('root'),
)

ReactDOM.render(

  <AppComponent
    orig={original5}
    docA={documentA5}
    docB={documentB5}
    selectedDoc={3}
    acceptFinalButtonText="Push Current DOC(Change this text)"
    changeRevisedDataForCaller={(doc) => changeRevisedDataForCaller(doc)}
  />,
  document.getElementById('root'),
)

ReactDOM.render(

  <AppComponent
    orig={original3}
    docA={documentA3}
    docB={documentB3}
    selectedDoc={1}
    acceptFinalButtonText="Push Current DOC(Change this text)"
    changeRevisedDataForCaller={(doc) => changeRevisedDataForCaller(doc)}
  />,
  document.getElementById('root'),
)

ReactDOM.render(

  <AppComponent
    orig={original2}
    docA={documentA2}
    docB={documentB2}
    selectedDoc={2}
    acceptFinalButtonText="Push Current DOC(Change this text)"
    changeRevisedDataForCaller={(doc) => changeRevisedDataForCaller(doc)}
  />,
  document.getElementById('root'),
)
