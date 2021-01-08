/**
  * @name revisedPanel/component.tsx
  */
import * as React from 'react'
import { connect } from 'react-redux';
import { ScrollSyncPane } from 'react-scroll-sync';
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'
import { Card, CardHeader, CardBody } from 'reactstrap';

import * as actions from '../../actions'
import { RevisedProps } from './header'
import store from '../../store'

class RevisedPanelComponent extends React.Component <RevisedProps> {
  static handleUpdateNewDoc(value: object) {
    store.dispatch(actions.updateNewDoc(value));
  }

  render() {
    const { updatedSrc } = this.props

    return (
      <div>
        <ScrollSyncPane>
          <Card
            style={{ height: '33rem',
              width: '103rem',
              marginBottom: '15px',
              overflow: 'auto',
              backgroundColor: '#efefef' }}
          >
            <CardHeader tag='h1'>Revised Document</CardHeader>
            <CardBody>
              <Grid container direction='row' style={{ marginBottom: '5px' }}>
                <Grid item>
                  <ReactJson
                    enableClipboard={false}
                    sortKeys
                    src={updatedSrc}
                    onAdd={
                    ({ updated_src }) => RevisedPanelComponent.handleUpdateNewDoc(updated_src)
                    }
                    onEdit={
                    ({ updated_src }) => RevisedPanelComponent.handleUpdateNewDoc(updated_src)
                    }
                    onDelete={
                    ({ updated_src }) => RevisedPanelComponent.handleUpdateNewDoc(updated_src)
                    }
                  />
                </Grid>
              </Grid>
            </CardBody>
          </Card>
        </ScrollSyncPane>
      </div>

    )
  }
}

function mapStateToProps(state: any) {
  return {
    updatedSrc: state.value,
  };
}

export default connect(mapStateToProps)(RevisedPanelComponent);
