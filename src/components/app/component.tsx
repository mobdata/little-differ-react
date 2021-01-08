import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux';

import { AppProps } from './header'
import LDRComponent from '../ldrApp/component'
import store from '../../store/index'
import * as actions from '../../actions'

class AppComponent extends React.PureComponent <AppProps> {
  render() {
    const {
      orig,
      docA,
      docB,
      selectedDoc,
      acceptFinalButtonText,
      changeRevisedDataForCaller,
    } = this.props

    return (
      <Provider key={selectedDoc} store={store}>

        <LDRComponent
          orig={orig}
          docA={docA}
          docB={docB}
          acceptFinalButtonText={acceptFinalButtonText}
          changeRevisedDataForCaller={(doc) => {
            console.log('calling changeRevisedDataForCaller in caller now.');
            changeRevisedDataForCaller(doc)
          }}
        />
      </Provider>
    )
  }
}

export default AppComponent;
