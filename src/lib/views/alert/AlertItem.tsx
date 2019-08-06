/** @jsx createElement */
import { createElement, SFC } from 'react'
import { Alert } from '../../models/alert'
import CloseIcon from '../icons/CloseIcon'

interface Props {
  alert: Alert
  dismissHandler: (alert: Alert) => void
}

const AlertItem: SFC<Props> = ({ dismissHandler, alert }) => (
  <div className={`alert ${alert.status}`}>
    {alert.message}
    {alert.dismissable && (
      <button
        onClick={() => {
          dismissHandler(alert)
        }}
        className="close icon"
      >
        <CloseIcon />
      </button>
    )}
  </div>
)

export default AlertItem
