/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { toArray } from '../../helpers/resourceHelper'
import { deleteAlert } from '../../controllers/alertController'
import { Alert } from '../../models'

import AlertItem from './AlertItem'

export interface AlertListConnected {
  alerts: Alert[]
}

interface AlertListActions {
  _deleteAlert: typeof deleteAlert
}

const AlertsList: SFC<AlertListConnected & AlertListActions> = ({ alerts, _deleteAlert }) => {
  if (!alerts || alerts.length < 1) return null

  return (
    <div className="alerts">
      {alerts.map((alert: Alert) => (
        <AlertItem alert={alert} dismissHandler={_deleteAlert} key={alert.key} />
      ))}
    </div>
  )
}

const mapState = (state: any): AlertListConnected => ({
  alerts: toArray(state.alerts) as Alert[]
})

const mapDispatch: AlertListActions = {
  _deleteAlert: deleteAlert
}

export default connect(
  mapState,
  mapDispatch
)(AlertsList)
