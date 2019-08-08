/** @jsx createElement */
import { createElement, SFC } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { deleteAlert } from '../../controllers/alertController'
import { toArray } from '../../helpers/resourceHelper'
import { Alert } from '../../models'
import AlertItem from './AlertItem'

export interface Connected {
  readonly alerts: readonly Alert[]
}

export interface Actions {
  readonly _deleteAlert: typeof deleteAlert
}

const AlertsList: SFC<Connected & Actions> = ({ alerts, _deleteAlert }) => {
  if (!alerts || alerts.length < 1) { return null }

  return (
    <div className="alerts">
      {alerts.map((alert: Alert) => (
        <AlertItem alert={alert} dismissHandler={_deleteAlert} key={v4()} />
      ))}
    </div>
  )
}

const mapState = (state: any): Connected => ({
  alerts: toArray(state.alerts) as readonly Alert[]
})

const mapDispatch: Actions = {
  _deleteAlert: deleteAlert
}

export default connect(
  mapState,
  mapDispatch
)(AlertsList)
