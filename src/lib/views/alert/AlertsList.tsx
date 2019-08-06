/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { toArray } from '../../helpers/resourceHelper'
import { deleteAlert } from '../../controllers/alertController'
import { Alert } from '../../models'

import AlertItem from './AlertItem'

interface Connected {
  alerts: Alert[]
}

interface Actions {
  _deleteAlert: typeof deleteAlert
}

const AlertsList: SFC<Connected & Actions> = ({ alerts, _deleteAlert }) => {
  if (!alerts || alerts.length < 1) return null

  return (
    <div className="alerts">
      {alerts.map((alert: Alert) => (
        <AlertItem alert={alert} dismissHandler={_deleteAlert} key={alert.key} />
      ))}
    </div>
  )
}

const mapState = (state: any): Connected => ({
  alerts: toArray(state.alerts) as Alert[]
})

const mapDispatch: Actions = {
  _deleteAlert: deleteAlert
}

export default connect(
  mapState,
  mapDispatch
)(AlertsList)
