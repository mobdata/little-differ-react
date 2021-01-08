/**
* @name node.tsx
* @author Sara Kim, Juliet Adams and Connor Bulakites
* @description This file defines a component which encapsulates a single
* key/value pair in a JSON document.
*/

import * as React from 'react'

interface Props {
  path: string
  displayDoc: number
  getPath: Function
  renderColor: string
  isBold: boolean
}

interface State {
}

/* Defines the node styles */
class Node extends React.Component <Props, State> {
  static sizeUp(nodeId) {
    document.getElementById(nodeId).style.fontSize = '18px'
  }

  static sizeBack(nodeId) {
    document.getElementById(nodeId).style.fontSize = '15px'
  }

  constructor(props: Props) {
    super(props);
    (this as any).state = {

    }
  }

  /* This is where the browser's onClick event is created (user clicks on an
   *element to add to the final doc). It calls getPath which
   *subsequently calls getValue and getTrueValue.
   */
  render() {
    const { children, path, displayDoc, getPath, renderColor, isBold } = this.props
    const nodeId = `node${displayDoc}${path}`;
    return (
      <div
        id={nodeId}
        style={{
          marginLeft: 15,
          cursor: 'pointer',
          color: renderColor,
          fontFamily: 'courier',
          fontWeight: isBold ? 'bold' : 'normal',
          fontSize: '15px',
        }}
        onClick={() => getPath(path)}
        onMouseOver={() => Node.sizeUp(nodeId)}
        onFocus={() => Node.sizeUp(nodeId)}
        onMouseOut={() => Node.sizeBack(nodeId)}
        onBlur={() => Node.sizeBack(nodeId)}
        role="presentation"
      >
        { children }
      </div>
    )
  }
}

export default Node
