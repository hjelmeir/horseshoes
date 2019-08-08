/** @jsx createElement */
import { createElement, SFC, ReactNode } from 'react'
import { v4 } from 'uuid'
import { Alert } from '../../models/alert'
import CloseIcon from '../icons/CloseIcon'

export interface AlertItemProps {
  alert: Alert
  dismissHandler: (alert: Alert) => void
}

const _renderMessages = (messages: string[]): ReactNode => {
  return (
    <ul>
      {messages.map(m => <li key={v4()}>{m}</li>)}
    </ul>
  )
}

const AlertItem: SFC<AlertItemProps> = ({ dismissHandler, alert }) => {
  let message = Array.isArray(alert.message) ? _renderMessages(alert.message) : alert.message

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
