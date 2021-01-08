/**
  * @name tripleDiffView/component.tsx
  * @author Juliet Adams, Sara Kim, Connor Bulakites, and Marita Carballo
  * @description  file defines a component which renders a color-coded diff
  * view between three JSON documents - docA and docB, with their original common ancestor.
  */

import * as React from 'react'
import { TripleDiffProps, State } from './header'
import Node from '../tripleDiffView/node'
import * as constants from '../../constants'
import getValue from '../../utils/getValue'
import countNestedObject from '../../utils/countNestedObject'

class TripleDiffViewComponent extends React.Component <TripleDiffProps, State> {
  /*
  * oneNested handles when the key value pair in one doc contains nested key value pairs
  * and the other does not. It will determine which doc contains the nested value, and
  * will call renderDiffView until it finds a non-nested value.
  */
  oneNested(key:string, value:object, isArray: Array<boolean>, isUndefined: Array<boolean>,
    isValueNull: Array<boolean>, indent:number, path:string, doc:object) : React.ReactNode {
    const { displayDoc } = this.props;

    return (
      <div>
        <div style={{ color: 'midnightblue', marginLeft: 15 }}>
          {'"'}
          {key}
          {'"'}
          :
          {'{'}
          {this.renderDiffView(Object.values(value[displayDoc])[0], indent + 1, path)}
          {'}'}
        </div>
      </div>
    )
  }

  /*
  * assignPair calls getValue to retrieve the value of the specified key
  * which is the last key in the path, and then passes the value and the Path
  * to the function addPair, which is found in the appView component.tsx file
  */
  assignPair(path: string, doc: object) {
    const { addPair } = this.props;
    const keys = path.split('.')
    const leftOrRight = Number(keys.shift())
    const originalKeys = keys.slice()
    keys.shift() // removes first item in array
    const value = getValue(doc, keys, leftOrRight);
    addPair(originalKeys, value)
  }

  /*
  * create node uses the node component (created in node.tsx) which will
  * enable the user to select the node to be added to the revised document.
  */
  createNode(key:string, value: any, isValueArray: boolean, valueIsUndefined: boolean,
    valueDefinedNull: boolean, pathStr: string, whichDoc: number, doc:object,
    renderColor: string, isBold: boolean) : React.ReactNode {
    const { displayDoc } = this.props;

    let updatedValue;

    if (valueIsUndefined === true) {
      updatedValue = 'undefined';
    } else if (valueDefinedNull === true) {
      updatedValue = 'null';
    } else {
      updatedValue = value.toString();
    }

    if (isValueArray) {
      return (
        <div>
          <div style={{ whiteSpace: 'pre' }}>
            <Node
              path={pathStr}
              displayDoc={displayDoc}
              getPath={(nodePath) => this.assignPair(`${whichDoc}.${pathStr}`, doc)}
              renderColor={renderColor}
              isBold={isBold}
            >
              { '"' }
              { key }
              { '"' }
              :
              { '[' }
              &nbsp;
              {updatedValue}
              {']'}
            </Node>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Node
          path={pathStr}
          displayDoc={displayDoc}
          getPath={(nodePath) => this.assignPair(`${whichDoc}.${pathStr}`, doc)}
          renderColor={renderColor}
          isBold={isBold}
        >
          {'"'}
          {key}
          {'"'}
          :
          {updatedValue}
        </Node>
      </div>
    )
  }

  /*
  *
  */
  inputSpacing(key:string, value:object, path:string, indent:number, doc:object) : React.ReactNode {
    const { displayDoc } = this.props;

    let otherIndex1 = 0;
    let otherIndex2 = 0;
    let isOther1Object = false;
    let isOther2Object = false;
    let isOther1Array = false;
    let isOther2Array = false;
    let isOther1Null = false;
    let isOther2Null = false;
    let matchEqualTag = '';
    let nullSpace = 0;
    let otherNestedCount = 0;

    if (displayDoc === constants.ORIG_INDEX) {
      // other Docs are docA and docB
      otherIndex1 = 2;
      otherIndex2 = 3;
      matchEqualTag = 'modsMatch';
    } else if (displayDoc === constants.DOCA_INDEX) {
      otherIndex1 = 1;
      otherIndex2 = 3;
      matchEqualTag = 'origMatchB'
    } else if (displayDoc === constants.DOCB_INDEX) {
      otherIndex1 = 1;
      otherIndex2 = 2;
      matchEqualTag = 'origMatchA'
    }
    if (value[displayDoc] === null) {
      nullSpace = 1;
    }
    if (value[otherIndex1] === null) {
      isOther1Null = true;
    } else if (typeof Object.values(value[otherIndex1])[0] === 'object') {
      isOther1Object = true;
    } else if (Array.isArray(value[otherIndex1])) {
      isOther1Array = true;
    }
    if (value[otherIndex2] === null) {
      isOther2Null = true;
    } else if (typeof Object.values(value[otherIndex2])[0] === 'object') {
      isOther2Object = true;
    } else if (Array.isArray(value[otherIndex2])) {
      isOther2Array = true;
    }
    if (value[displayDoc] !== null
      && isOther1Object === false && isOther2Object === false) {
      return '';
    }

    // both other docs contain objects
    if (isOther1Object === true && isOther2Object === true
      && isOther1Array === false && isOther2Array === false) {
      const docANestedCount = countNestedObject(value[otherIndex1], otherIndex1).length;
      otherNestedCount = docANestedCount;
      // Are both other objects equal?
      // If they are equal - we don't need to get the count for both of them.  Only one.
      if (Object.values(value[constants.MATCH_INDEX])[0] === matchEqualTag) {
        otherNestedCount = docANestedCount;
      } else {
        const docBNestedCount = countNestedObject(value[otherIndex2], otherIndex2).length;
        if (docBNestedCount > docANestedCount) {
          otherNestedCount = docBNestedCount;
        }
      }
    } else if (isOther1Object === true && isOther1Array === false
               && isOther2Object === false && isOther2Array === false) {
      otherNestedCount = countNestedObject(value[otherIndex1], otherIndex1).length;
    } else if (isOther1Object === false && isOther1Array === false
               && isOther2Object === true && isOther2Array === false) {
      otherNestedCount = countNestedObject(value[otherIndex2], otherIndex2).length;
    }

    return (
      <div>
        {TripleDiffViewComponent.renderSpaces(otherNestedCount + nullSpace)}
      </div>
    )
  }

  /*
  * allNested is for the case in which all 3 documents contain a nested key value pair
  * it will recursively move down until it finds at least one value that is not nested
  */
  allNested(key:string, value:object, indent: number, path: string) : React.ReactNode {
    return (
      <div style={{ marginLeft: 15 }}>
        {'"'}
        {key}
        {'"'}
        :
        {'{'}
        {this.renderDiffView(value, indent + 1, path)}
        {'}'}
      </div>
    )
  }

  /*
  * equal values deals with the case in which the two values are equal, so it will just
  * render a node, but it sets the whichDoc value to 2, which will ensure that the
  * render color is black
  * Since it's equal, it calls addToEqualValues in props.
  */
  equalValues(key:string, value:any, isArray:boolean,
    isUndefined:boolean, isDefinedNull:boolean, path: string, doc:object) : React.ReactNode {
    const { addToEqualValues } = this.props;
    const isBold = false;
    const keys = path.split('.')
    const originalKeys = keys.slice()
    const leftOrRight = 1
    keys.shift()// removes first item in array

    const keyValue = getValue(doc, keys, leftOrRight);

    addToEqualValues(originalKeys, keyValue);
    return this.createNode(key, value, isArray, isUndefined, isDefinedNull, path, 2, doc,
      constants.COLOR_EQUAL, isBold)
  }

  /*
  * renderNested handles when the key value pair in one or two docs contains nested key value
  * pairs and one does not. It will determine which doc contains the nested value(s), and
  * will call renderDiffView until it finds a non-nested value.
  */
  renderNested(key:string, value:object, isArray: Array<boolean>, isUndefined: Array<boolean>,
    isValueNull: Array<boolean>, indent:number, path:string, doc:object) : React.ReactNode {
    const { displayDoc } = this.props;

    return (
      <div>
        <div style={{ color: 'midnightblue', marginLeft: 15 }}>
          {'"'}
          {key}
          {'"'}
          :
          {'{'}
          {this.renderDiffView(Object.values(value[displayDoc])[0], indent + 1, path)}
          {'}'}
        </div>
      </div>
    )
  }

  /*
  * renderDiffView takes in the diffed doc, an indent size and the current path of the
  * key. for each key function determines the case, and sets up a <div> to be rendered.
  * The key's path is kept track throughout the function by passing in the current path +
  * the current key (as a string with . between each key) into the function when it is being
  * called recursively.
  */
  renderDiffView(doc: any, indent: number, path: string) : React.ReactNode {
    const { displayDoc } = this.props;

    return (
      <div>{
        Object.keys(doc).map((key) => (
          <div key={key}>{(
            () => {
              const value = doc[key]
              const isValueArray = [null, false, false, false]
              const valueIsUndefined = [null, false, false, false]
              const valueDefinedNull = [null, false, false, false]
              const valueIsNested = [null, false, false, false]

              if (!(Array.isArray(value))) {
                return this.allNested(key, value, indent, `${path}.${key}`)
              }
              // if not - check the key values
              // first - is the key missing?
              if (value[displayDoc] === null) {
                return this.inputSpacing(key, value, `${path}`, indent, doc)
              }

              // it's not a missing key - it has the key
              // set flags for what the key value is
              if (Array.isArray(Object.values(value[displayDoc])[0])) {
                isValueArray[displayDoc] = true;
              } else if (Object.values(value[displayDoc])[0] === undefined) {
                valueIsUndefined[displayDoc] = true
              } else if (Object.values(value[displayDoc])[0] === null) {
                valueDefinedNull[displayDoc] = true
              } else if (Object.values(value[displayDoc])[0] !== null
                && typeof Object.values(value[displayDoc])[0] === 'object') {
                valueIsNested[displayDoc] = true
              }

              if (valueIsNested[displayDoc] === true) {
                return this.renderNested(key, value, isValueArray, valueIsUndefined,
                  valueDefinedNull, indent, `${path}.${key}`, doc)
              }

              // If all the values are the same - call equalValues

              if (Object.values(value[constants.MATCH_INDEX])[0] === 'allEqual') {
                return this.equalValues(key, Object.values(value[displayDoc])[0],
                  isValueArray[displayDoc],
                  valueIsUndefined[displayDoc],
                  valueDefinedNull[displayDoc],
                  `${path}.${key}`, doc);
              } else if ((displayDoc === 2
                && Object.values(value[constants.MATCH_INDEX])[0] === 'origMatchA')
                || (displayDoc === 3
                && Object.values(value[constants.MATCH_INDEX])[0] === 'origMatchB')) {
                return (
                  <div>
                    {this.createNode(key, Object.values(value[displayDoc])[0],
                      isValueArray[displayDoc],
                      valueIsUndefined[displayDoc],
                      valueDefinedNull[displayDoc],
                      `${path}.${key}`, displayDoc,
                      doc,
                      constants.NEW_COLOR_EQUAL_TO_ORIG_ARRAY[displayDoc], false)}
                    {this.inputSpacing(key, value, `${path}`, indent, doc)}
                  </div>
                )
              }
              // all else - format should be the mismatch color and bolded
              return (
                <div>
                  {this.createNode(key, Object.values(value[displayDoc])[0],
                    isValueArray[displayDoc],
                    valueIsUndefined[displayDoc],
                    valueDefinedNull[displayDoc],
                    `${path}.${key}`, displayDoc, doc,
                    constants.NEW_COLOR_NOT_EQUAL_ARRAY[displayDoc], true)}
                  {this.inputSpacing(key, value, `${path}`, indent, doc)}
                </div>
              )
            })()}
          </div>))
        }
      </div>
    )
  }

  /*
  * renderSpaces will render n number of blank lines
  */
  static renderSpaces(numLines) {
    const arr = [];
    for (let i = 0; i < numLines; i++) {
      arr.push('\n');
    }
    return (
      <div style={{ whiteSpace: 'pre', backgroundColor: 'lightgrey' }}>{ arr }</div>
    )
  }

  /*
  * render will call renderDiffView the recursive function that will display the diffed document
  */
  render() {
    const { doc } = this.props

    const numItems = Object.keys(doc).length

    return (
      <div style={{ fontFamily: 'courier', fontSize: '14px' }}>
        {'"root" : { '}
        {`${numItems} items`}
        {this.renderDiffView(doc, 1, 'root')}
        {'}'}
      </div>
    )
  }
}

export default TripleDiffViewComponent;
