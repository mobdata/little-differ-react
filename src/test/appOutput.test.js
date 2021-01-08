import React from 'react';
import ReactDOM from 'react-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import TestRenderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';// React 16 Enzyme adapter

import AppComponent from '../components/app/component'
import { Provider } from 'react-redux';
import store from '../store/index';

// Avoid Warning: render(): Rendering components directly into document.body is discouraged.
beforeEach(() => {
  // Avoid `attachTo: document.body` Warning
  const div = document.createElement('div');
  div.setAttribute('id', 'container');
  document.body.appendChild(div);
});

afterEach(() => {
  const div = document.getElementById('container');
  if (div) {
    document.body.removeChild(div);
  }
});

test('Simple output test', () => {
  const simpleTest1 = { _rev: 2, a: 1, b: 2, c: 3, d: 4 }
  const originalSimpleTest1 = { _rev: 1, b:2 }
  const expectedOutput = "Revision:2\"root\" : { 5 items \"_rev\":2 \"a\" : 1  \"b\" : 2  \"c\" : 3  \"d\" : 4  }" +
                         "PreviousRevision:1\"root\" : { 5 items  \"_rev\":1 \"b\" : 2      }" +
                         "Revision:2\"root\" : { 5 items \"_rev\":2 \"a\" : 1  \"b\" : 2  \"c\" : 3  \"d\" : 4  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{1 item\"b\":int2}";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleTest1}
        docA={simpleTest1}
        docB={simpleTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });

    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));

});


test('Undefined output test', () => {
const undefinedTest1 = { _rev: 2, a: 1 }
const originalUndefinedTest1 = { _rev: 1, a: undefined }
  const expectedOutput = "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : 1 }" +
                         "PreviousRevision:1\"root\" : { 2 items  \"_rev\":1 \"a\" : undefined      }" +
                         "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : 1  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{}0 items";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalUndefinedTest1}
              docA={undefinedTest1}
              docB={undefinedTest1}
                      changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
});

test('Simple Null test 1', () => {
const simpleNullTest1 = { _rev: 2, a: null, b: 123 }
const originalSimpleNullTest1 = { _rev: 1, b: 123 }

  const expectedOutput = "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : null \"b\" : 123  }" +
                         "PreviousRevision:1\"root\" : { 3 items  \"_rev\":1 \"b\" : 123      }" +
                         "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : null \"b\" : 123  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{1 item\"b\" :int123}";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleNullTest1}
              docA={simpleNullTest1}
              docB={simpleNullTest1}
                      changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
});

test('simpleMismatchTest1', () => {
const simpleMismatchTest1 = { _rev: 2, a: 1 }
const originalSimpleMismatchTest1 = { _rev: 1, a: 2 }
  const expectedOutput = "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : 1 }" +
                         "PreviousRevision:1\"root\" : { 2 items  \"_rev\":1 \"a\" : 2      }" +
                         "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : 1  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{}0 items";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMismatchTest1}
              docA={simpleMismatchTest1}
              docB={simpleMismatchTest1}
                      changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
});

test('simpleMismatchTest2', () => {
const simpleMismatchTest2 = { _rev: 2, a: 1, b: 2, c: 3, d: 4, e: 5 }
const originalSimpleMismatchTest2 = { _rev: 1, a: 2, b: 3, c: 4, d: 5, e: 6 }
  const expectedOutput = "Revision:2\"root\" : { 6 items \"_rev\":2 \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 \"e\" : 5 }" +
                         "PreviousRevision:1\"root\" : { 6 items  \"_rev\":1 \"a\" : 2  \"b\" : 3  \"c\" : 4 \"d\" : 5 \"e\" : 6  }" +
                         "Revision:2\"root\" : { 6 items \"_rev\":2 \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 \"e\" : 5  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{}0 items";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMismatchTest2}
        docA={simpleMismatchTest2}
        docB={simpleMismatchTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

test('simpleMatchTest1', () => {
const simpleMatchTest1 = { _rev:2, a: 1, b: 2 }
const originalSimpleMatchTest1 = { _rev:1, a: 1, b: 2 }
  const expectedOutput = "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : 1 \"b\" : 2 }" +
                         "PreviousRevision:1\"root\" : { 3 items  \"_rev\":1 \"a\" : 1  \"b\" : 2  }" +
                         "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : 1 \"b\" : 2  }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document\"root\":{2 items \"a\" : int1 \"b\" : int2 }";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalSimpleMatchTest1}
        docA={simpleMatchTest1}
        docB={simpleMatchTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

test('undefinedTest2', () => {
const undefinedTest2 = {
  _rev: 2,
  a: undefined,
  b: undefined,
  c: undefined,
  d: undefined,
  e: undefined,
  f: undefined,
}
const originalUndefinedTest2 = { _rev: 1, c: 1 }

const expectedOutput = "Revision:2\"root\" : { 7 items \"_rev\":2 \"a\" : undefined \"b\" : undefined \"c\" : undefined \"d\" : undefined \"e\" : undefined \"f\" : undefined}" +
                       "PreviousRevision:1\"root\" : { 7 items \"_rev\":1 \"c\" : 1  }" +
                       "Revision:2\"root\" : { 7 items \"_rev\":2 \"a\" : undefined \"b\" : undefined \"c\" : undefined \"d\" : undefined \"e\" : undefined \"f\" : undefined}" +
                       "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                       "Revised Document\"root\":{}0 items";
  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalUndefinedTest2}
        docA={undefinedTest2}
        docB={undefinedTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

test('nestedMismatchTest1', () => {
const nestedMismatchTest1 = { _rev: 2, a: { b: 2 } }
const originalNestedMismatchTest1 = { _rev: 1, a: { b: 3 } }

const expectedOutput = "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : { \"b\" : 2 } }" +
                       "PreviousRevision:1\"root\" : { 2 items \"_rev\":1 \"a\" : { \"b\" : 3  } }" +
                       "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : { \"b\" : 2 } }" +
                       "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                       "Revised Document\"root\":{}0 items";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalNestedMismatchTest1}
        docA={nestedMismatchTest1}
        docB={nestedMismatchTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

test('nestedMismatchTest2', () => {
const nestedMismatchTest2 = { _rev: 2, a: { b: null } }
const originalNestedMismatchTest2 = { _rev: 1, a: { b: 1 } }

const expectedOutput = "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : { \"b\" : null } }" +
                       "PreviousRevision:1\"root\" : { 2 items \"_rev\":1 \"a\" : { \"b\" : 1  } }" +
                       "Revision:2\"root\" : { 2 items \"_rev\":2 \"a\" : { \"b\" : null } }" +
                       "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                       "Revised Document\"root\":{}0 items";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalNestedMismatchTest2}
        docA={nestedMismatchTest2}
        docB={nestedMismatchTest2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

test('nestedMatchWithArrayTest1', () => {
const nestedMatchWithArrayTest1 = { _rev: 2, a: { b: 2, c: 3 }, j: [10, 9, 8] }
const originalNestedMatchWithArrayTest1 = { _rev: 1, a: { b: 2, c: 3 }, j: [10, 9, 8] }

const expectedOutput = "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : { \"b\" : 2  \"c\" : 3 } \"j\" : [10,9,8] }" +
                       "PreviousRevision:1\"root\" : { 3 items \"_rev\":1 \"a\" : { \"b\" : 2  \"c\" : 3 } \"j\" : [10,9,8] }" +
                       "Revision:2\"root\" : { 3 items \"_rev\":2 \"a\" : { \"b\" : 2  \"c\" : 3 } \"j\" : [10,9,8] }" +
                       "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                       "Revised Document\"root\":{ 2 items \"a\" : { 2 items \"b\" : int2  \"c\" : int3 } \"j\" : [3 items 0: int10 1: int9 2: int8] }";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={originalNestedMatchWithArrayTest1}
        docA={nestedMatchWithArrayTest1}
        docB={nestedMatchWithArrayTest1}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
})

describe('original 2 tests', () => {
const documentA2 = {
  _rev: '2-deltaA',
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
  _rev: '2-deltaB',
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
          k:123,
        },
      },
      j: [10, 9, 8],
    },
  },
}

const original2 = {
  _rev: '1-a',
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
          z: {a: 1, b: 2, c: 3, d: 4},
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

  test('original2TestAB', () => {
  const expectedOutput = "Revision:2-deltaA \"root\":{ 3 items \"_rev\":2-deltaA \"a\" : { \"a\" :{ \"a\" :{ \"a\" :{ \"a\" :1 \"b\" : undefined \"c\" : false " +
                                    "\"c2\" : 1 \"d\" : true \"e\" : 5 \"k\" : null \"y\" : [1,2] \"z\" : 1}} \"j\" : [ 10, 9, 8 ] } }" +
                                    "\"h\" : { \"i\" : false \"m\" : true } } " +
                         "PreviousRevision:1-a \"root\":{ 3 items \"_rev\":1-a \"a\" : { \"a\" :{ \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined" +
                                    "\"c\" : false \"d\" : true \"e\" : 5 \"k\" : null \"y\" : 1 \"z\" : { \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 } } }" +
                                    "\"j\" : [ 10, 9, 8 ] } } \"h\" : { \"i\" : false \"m\" : true } }" +
                         "Revision:2-deltaB \"root\" : { 3 items \"_rev\":2-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : true \"c\" : false \"d\" : { \"e\" : [ 1, 2, 3 ]" +
                                    "\"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } \"e\" : 5 \"k\" : 123 } } \"j\" : [ 10, 9, 8 ] } } }" +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 2 items \"a\" : { 1 item \"a\" : { 2 items \"c\" : bool false" +
                                    "\"e\" : int 5 } } \"j\" : [ 3 items 0 : int 10 1 : int 9 2 : int 8 ] } } }";


  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentA2}
        docB={documentB2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

  test('original2TestA', () => {
  const expectedOutputA = "Revision:2-deltaA \"root\" : { 3 items \"_rev\":2-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"c2\" : 1 \"d\" : true \"e\" : 5 \"k\" : null \"y\" : [ 1, 2 ] \"z\" : 1 } } " +
                                    "\"j\" : [ 10, 9, 8 ] } } \"h\" : { \"i\" : false \"m\" : true } } " +
                          "PreviousRevision:1-a \"root\" : { 3 items \"_rev\":1-a \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"d\" : true \"e\" : 5 \"k\" : null \"y\" : 1 \"z\" : { \"a\" : 1 \"b\" : 2 " +
                                    "\"c\" : 3 \"d\" : 4 } } } \"j\" : [10, 9, 8] } } \"h\" : { \"i\" : false \"m\":true}}" +
                          "Revision:2-deltaA \"root\" : { 3 items \"_rev\":2-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"c2\" : 1 \"d\" : true \"e\" : 5 \"k\" : null \"y\" : [1, 2] \"z\" : 1 } } " +
                                    "\"j\" : [10, 9, 8] } } \"h\" : { \"i\" : false \"m\" : true } } " +
                          "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                          "Revised Document \"root\" : { 2 items \"a\" : { 1 item \"a\" : { 2 items \"a\" : { 1 item \"a\" : " +
                                    "{ 6 items \"a\" : int 1 \"b\" : undefined \"c\" : bool false \"d\" : bool true " +
                                    "\"e\" : int 5 \"k\" : NULL } } \"j\" : [ 3 items 0 : int 10 1 : int 9 2 : int 8 ] } } " +
                                    "\"h\" : { 2 items \"i\" : bool false \"m\" : bool true } } ";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentA2}
        docB={documentA2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}

      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutputA.replace(/\s/g, ''));
  });

  test('original2TestB', () => {
  const expectedOutputA = "Revision:2-deltaB \"root\" : { 3 items \"_rev\":2-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : true \"c\" : false \"d\" : { \"e\" : [ 1, 2, 3 ]" +
                                    "\"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } \"e\" : 5 \"k\" : 123 } } \"j\" : [ 10, 9, 8 ] } } }" +
                          "PreviousRevision:1-a \"root\":{ 3 items \"_rev\":1-a \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined \"c\" : false \"d\" : true " +
                                    "\"e\" : 5 \"k\" : null \"y\" : 1 \"z\" : { \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 } } } \"j\" : [ 10, 9, 8 ] } } \"h\" : { \"i\" : false \"m\" : true } } " +
                          "Revision:2-deltaB \"root\" : { 3 items \"_rev\":2-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : true \"c\" : false \"d\" : { \"e\" : [ 1, 2, 3 ]" +
                                                                         "\"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } \"e\" : 5 \"k\" : 123 } } \"j\" : [ 10, 9, 8 ] } } }" +
                          "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                          "Revised Document \"root\": {1 item \"a\" : { 1 item \"a\" : { 2 items \"a\" : { 1 item \"a\" : { 2 items \"c\" : bool false " +
                                    "\"e\" : int 5 } } \"j\" : [ 3 items 0 : int 10 1 : int 9 2 : int 8 ] } } } " ;

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original2}
        docA={documentB2}
        docB={documentB2}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutputA.replace(/\s/g, ''));
  });
});

describe('original 3 tests', () => {
const documentA3 = {
  _rev: '4-deltaA',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: true,
          y: 1,
        }
      }
    }
  }
}

const original3 = {
  _rev: '3-orig',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c2: 1,
          d: true,
          y: [1, 2],
        }
      }
    }
  }
  }

const documentB3 = {
  _rev: '4-deltaB',
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
        }
      }
    }
  }
}

  test('original3TestAB', () => {
  const expectedOutput = "Revision:4-deltaA \"root\" : { 2 items \"_rev\":4-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"d\" : true \"y\" : 1 } } } } } " +
                         "PreviousRevision:3-orig \"root\" : { 2 items \"_rev\":3-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c2\" : 1 \"d\" : true \"y\" : [ 1,2 ] } } } } } " +
                         "Revision:4-deltaB \"root\" : { 2 items \"_rev\":4-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c2\" : 1 \"d\" : { \"e\" : [ 1, 2, 3 ] \"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } } } } } } " +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item " +
                                    "\"a\" : { 2 items \"a\" : int 1 \"b\" : undefined } } } } } ";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentA3}
        docB={documentB3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

  test('original3TestA', () => {
  const expectedOutput = "Revision:4-deltaA \"root\" : { 2 items \"_rev\":4-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                   "\"c\" : false \"d\" : true \"y\" : 1 } } } } } " +
                         "PreviousRevision:3-orig \"root\" : { 2 items \"_rev\":3-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c2\" : 1 \"d\" : true \"y\" : [ 1,2 ] } } } } } " +
                         "Revision:4-deltaA \"root\" : { 2 items \"_rev\":4-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                   "\"c\" : false \"d\" : true \"y\" : 1 } } } } } " +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document \"root\":{ 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 3 items " +
                                   "\"a\" : int 1 \"b\" : undefined \"d\" : bool true } } } } }";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentA3}
        docB={documentA3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

  test('original3TestB', () => {
  const expectedOutput = "Revision:4-deltaB \"root\" : { 2 items \"_rev\":4-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                   "\"c2\" : 1 \"d\" : { \"e\" : [ 1, 2, 3 ] \"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } } } } } } " +
                         "PreviousRevision:3-orig \"root\" : { 2 items \"_rev\":3-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c2\" : 1 \"d\" : true \"y\" : [ 1,2 ] } } } } } " +
                         "Revision:4-deltaB \"root\" : { 2 items \"_rev\":4-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c2\" : 1 \"d\" : { \"e\" : [ 1, 2, 3 ] \"f\" : [ 4, 5, 6 ] \"g\" : [ 7, 8, 9 ] } } } } } } " +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : " +
                                    "{ 3 items \"a\" : int 1 \"b\" : undefined \"c2\" : int 1 } } } } } ";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original3}
        docA={documentB3}
        docB={documentB3}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

describe('original 4 tests', () => {
const original4 = {
  _rev: '4-orig',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          z1: {a: 1, b: 2},
        },
      },
    },
  },
}

const documentA4 = {
  _rev: '5-deltaA',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          z: {a: 1, b: 2, d: 4},
        },
      },
    },
  },
}

const documentB4 = {
  _rev: '5-deltaB',
  a: {
    a: {
      a: {
        a: {
          a: 1,
          b: undefined,
          c: false,
          d: 2,
          z: {a: 1, b: 2, c: 3, d: 4},
          z1: {a: 1, b: 2},
        },
      },
    },
  },
}

  test('original4TestAB', () => {
  const expectedOutput = "Revision:5-deltaA \"root\" : { 2 items \"_rev\":5-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"z\" : { \"a\" : 1 \"b\" : 2 \"d\" : 4 } } } } } } " +
                         "PreviousRevision:4-orig \"root\" : { 2 items \"_rev\":4-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                         "Revision:5-deltaB \"root\" : { 2 items \"_rev\":5-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                    "\"c\" : false \"d\" : 2 \"z\" : { \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 } \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                         "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                         "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : " +
                                    "{ 3 items \"a\" : int 1 \"b\" : undefined \"c\" : bool false } } } } } ";

  const wrapper = mount(
    <Provider store={store}>
      <AppComponent
        orig={original4}
        docA={documentA4}
        docB={documentB4}
        changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
      />
    </Provider>, { attachTo: document.getElementById('container') });
    expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
  });

    test('original4TestA', () => {
    const expectedOutput = "Revision:5-deltaA \"root\" : { 2 items \"_rev\":5-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                      "\"c\" : false \"z\" : { \"a\" : 1 \"b\" : 2 \"d\" : 4 } } } } } } " +
                           "PreviousRevision:4-orig \"root\" : { 2 items \"_rev\":4-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                      "\"c\" : false \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                           "Revision:5-deltaA \"root\" : { 2 items \"_rev\":5-deltaA \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                     "\"c\" : false \"z\" : { \"a\" : 1 \"b\" : 2 \"d\" : 4 } } } } } } " +
                           "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                           "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : " +
                                      "{ 3 items \"a\" : int 1 \"b\" : undefined \"c\" : bool false } } } } } ";

    const wrapper = mount(
      <Provider store={store}>
        <AppComponent
          orig={original4}
          docA={documentA4}
          docB={documentA4}
          changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
        />
      </Provider>, { attachTo: document.getElementById('container') });
      expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
    });

    test('original4TestB', () => {
    const expectedOutput = "Revision:5-deltaB \"root\" : { 2 items \"_rev\":5-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                     "\"c\" : false \"d\" : 2 \"z\" : { \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 } \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                           "PreviousRevision:4-orig \"root\" : { 2 items \"_rev\":4-orig \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                      "\"c\" : false \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                           "Revision:5-deltaB \"root\" : { 2 items \"_rev\":5-deltaB \"a\" : { \"a\" : { \"a\" : { \"a\" : { \"a\" : 1 \"b\" : undefined " +
                                     "\"c\" : false \"d\" : 2 \"z\" : { \"a\" : 1 \"b\" : 2 \"c\" : 3 \"d\" : 4 } \"z1\" : { \"a\" : 1 \"b\" : 2 } } } } } } " +
                           "Accept Doc A Ignore Mods and Accept Original Accept Doc B" +
                           "Revised Document \"root\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : { 1 item \"a\" : " +
                                     "{ 4 items \"a\" : int 1 \"b\" : undefined \"c\" : bool false \"z1\" : { 2 items\"a\":int1\"b\" : int 2 } } } } } } ";

    const wrapper = mount(
      <Provider store={store}>
        <AppComponent
          orig={original4}
          docA={documentB4}
          docB={documentB4}
          changeRevisedDataForCaller={(doc) => console.log("revisedDoc result: " + JSON.stringify(doc))}
        />
      </Provider>, { attachTo: document.getElementById('container') });
      expect(wrapper.text().replace(/\s/g, '')).toEqual(expectedOutput.replace(/\s/g, ''));
    });
});

});
