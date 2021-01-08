import React from 'react'
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';

import { compareJSON } from '@jacobs.com/little-differ'

import AppComponent from '../components/app/component'
import store from '../store/index';

const simpleTest1 = { a: 1, b: 2, c: 3, d: 4 }
const originalSimpleTest1 = { b: 2 }

test('simpleTest1', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleTest1}
        docA={simpleTest1}
        docB={simpleTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const undefinedTest1 = { a: 1 }
const originalUndefinedTest1 = { a: undefined }

test('undefinedTest1', () => {
  const tree = renderer.create(

    <Provider store={store}>
      <AppComponent
        orig={originalUndefinedTest1}
        docA={undefinedTest1}
        docB={undefinedTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const simpleNullTest1 = { a: null, b: 123 }
const originalSimpleNullTest1 = { b: 123 }


test('simpleNullTest1', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalSimpleNullTest1}
        docA={simpleNullTest1}
        docB={simpleNullTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const simpleMismatchTest1 = { a: 1 }
const originalSimpleMismatchTest1 = { a: 2 }

test('simpleMismatchTest1', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMismatchTest1}
        docA={simpleMismatchTest1}
        docB={simpleMismatchTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const simpleMismatchTest2 = { a: 1, b: 2, c: 3, d: 4, e: 5 }
const originalSimpleMismatchTest2 = { a: 2, b: 3, c: 4, d: 5, e: 6 }

test('simpleMismatchTest2', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMismatchTest2}
        docA={simpleMismatchTest2}
        docB={simpleMismatchTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const simpleMatchTest1 = { a: 1, b: 2 }
const originalSimpleMatchTest1 = { a: 1, b: 2 }

test('simpleMatchTest1', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMatchTest1}
        docA={simpleMatchTest1}
        docB={simpleMatchTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const undefinedTest2 = {
  a: undefined,
  b: undefined,
  c: undefined,
  d: undefined,
  e: undefined,
  f: undefined,
}
const originalUndefinedTest2 = { c: 1 }

test('undefinedTest2', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalUndefinedTest2}
        docA={undefinedTest2}
        docB={undefinedTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const nestedMismatchTest1 = { a: { b: 2 } }
const originalNestedMismatchTest1 = { a: { b: 3 } }

test('nestedMismatchTest1', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalNestedMismatchTest1}
        docA={nestedMismatchTest1}
        docB={nestedMismatchTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const nestedMismatchTest2 = { a: { b: null } }
const originalNestedMismatchTest2 = { a: { b: 1 } }

test('nestedMismatchTest2', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalNestedMismatchTest2}
        docA={nestedMismatchTest2}
        docB={nestedMismatchTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const nestedMatchWithArrayTest1 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }
const originalNestedMatchWithArrayTest1 = { a: { b: 2, c: 3 }, j: [10, 9, 8] }

test('nestedMatchWithArrayTest1', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={originalNestedMatchWithArrayTest1}
        docA={nestedMatchWithArrayTest1}
        docB={nestedMatchWithArrayTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const original2 = {
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

test('original2TestA', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentA2}
        docB={documentA2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

test('original2TestB', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentB2}
        docB={documentB2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

test('original2TestAB', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentA2}
        docB={documentB2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})


const documentA3 = {
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: true,
          y: 1,
        },
      },
    },
  },
}

const original3 = {
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c2: 1,
          d: true,
          y: [1, 2],
        },
      },
    },
  },
}

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

test('original3TestA', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentA3}
        docB={documentA3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

test('original3TestB', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentB3}
        docB={documentB3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

test('original3TestAB', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentA3}
        docB={documentB3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

const original4 = {
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

test('original4TestA', () => {
  const tree = renderer.create(


    <Provider store={store}>
      <AppComponent
        orig={original4}
        docA={documentA4}
        docB={documentB4}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})

test('original4TestB', () => {
  const tree = renderer.create(

    <Provider store={store}>
      <AppComponent
        orig={original4}
        docA={documentB3}
        docB={documentB3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>,
  )

  expect(tree).toMatchSnapshot();
})
