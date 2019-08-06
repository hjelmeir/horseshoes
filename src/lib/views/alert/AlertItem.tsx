/** @jsx createElement */
import { createElement, SFC } from 'react'
import { Alert } from '../../models/alert'
import CloseIcon from '../icons/CloseIcon'

export interface AlertItemProps {
  alert: Alert
  dismissHandler: (alert: Alert) => void
}

const AlertItem: SFC<AlertItemProps> = ({ dismissHandler, alert }) => (
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
