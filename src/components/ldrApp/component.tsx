/**
  * @name ldrApp/component.tsx
*/
import * as React from 'react'
import { connect } from 'react-redux';
import { ScrollSync } from 'react-scroll-sync';
import { CardDeck, Button, ButtonToolbar } from 'reactstrap';

import * as actions from '../../actions'
import { AppProps, AppState } from './header'
import MergePanelsComponent from '../mergePanels/component'
import RevisedPanelComponent from '../revisedPanel/component'
import store from '../../store'

class LDRComponent extends React.PureComponent <AppProps, AppState> {
  render() {
    const {
      orig,
      docA,
      docB,
      updatedSrc,
      acceptFinalButtonText,
      changeRevisedDataForCaller,
    } = this.props

    return (
      <div>

        <ScrollSync>
          <div style={{ display: 'flex', position: 'relative', height: 300 }}>
            <CardDeck>
              <MergePanelsComponent
                orig={orig}
                docA={docA}
                docB={docB}
              />
              <ButtonToolbar
                style={{ marginLeft: '12rem', marginBottom: '15px' }}
              >
                <Button
                  style={{ marginRight: '25rem' }}
                  outline
                  color="primary"
                  active
                  onClick={() => RevisedPanelComponent.handleUpdateNewDoc(docA)}
                >
                  Accept Doc A
                </Button>
                <Button
                  style={{ marginRight: '22rem' }}
                  outline
                  color="secondary"
                  active
                  onClick={() => RevisedPanelComponent.handleUpdateNewDoc(orig)}
                >
                  Ignore Mods and Accept Original
                </Button>
                <Button
                  style={{ marginRight: '5rem' }}
                  outline
                  color="danger"
                  active
                  onClick={() => RevisedPanelComponent.handleUpdateNewDoc(docB)}
                >
                  Accept Doc B
                </Button>
              </ButtonToolbar>
              <RevisedPanelComponent />
              <Button
                style={{ position: 'fixed', bottom: 100, right: 300 }}
                onClick={() => {
                  changeRevisedDataForCaller(updatedSrc)
                }}
              >
                {acceptFinalButtonText}
              </Button>
            </CardDeck>
          </div>
        </ScrollSync>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    updatedSrc: state.value,
  };
}

export default connect(mapStateToProps)(LDRComponent);
