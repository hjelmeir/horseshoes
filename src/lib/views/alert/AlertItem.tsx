/**
 * @jsx createElement
 */
import { createElement, ReactNode, SFC } from 'react'
import { v4 } from 'uuid'
import { Alert } from '../../models/alert'
import CloseIcon from '../icons/CloseIcon'

export interface AlertItemProps {
  readonly alert: Alert
  readonly dismissHandler: (alert: Alert) => void
}

const renderMessages = (messages: readonly string[]): ReactNode => {
  return (
    <ul>
      {messages.map(m => <li key={v4()}>{m}</li>)}
    </ul>
  )
}

const AlertItem: SFC<AlertItemProps> = ({ dismissHandler, alert }) => {
  const message = Array.isArray(alert.message) ? renderMessages(alert.message) : alert.message

  return (
    <div className={`alert ${alert.status}`}>
      {message}
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
}

export default AlertItem
