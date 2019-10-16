/**
 * @jsx createElement
 */
import { createElement, ReactNode, SFC, useState } from 'react'
import { OptionsObject, RadioFieldProps } from './types'

const renderRadioOptions = ({ name, selected, onChange }: RadioFieldProps, options?: OptionsObject): ReactNode => {
  if (!options) {
    return null
  }

  return Object.keys(options).map(k => (
    <label key={k} className={selected === k ? 'active' : ''}>
      <input type="radio" name={name} value={k} checked={selected === k} onChange={onChange} />
      <span>{options[k].label}</span>
    </label>
  ))
}

const RadioField: SFC<RadioFieldProps> = props => {
  const { name, type, label, options, validate, onValid, onInvalid, onChange, ...inputProps } = props
  const field = null

  const [valid, setValid] = useState(true)
  const classes = ['field', type]
  validate && valid ? classes.push('valid') : classes.push('invalid')
  inputProps.value && inputProps.value.length > 0 ? classes.push('not-empty') : classes.push('empty')

  const validateHandler = (value: string): void => {
    if (!validate) {
      return
    }

    const [isValid, error] = validate(value)
    if (isValid === true && onValid) {
      onValid()
    }

    if (isValid !== true && onInvalid) {
      onInvalid(error)
    }

    setValid(isValid === true)
  }

  const changeHandler = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    if (validate && !valid) {
      validateHandler(e.currentTarget.value)
    }

    onChange(e)
  }

  const blurHandler = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    if (validate) {
      validateHandler(e.currentTarget.value)
    }
  }

  switch (type) {
    case 'toggle':
      return (
        <label className={classes.join(' ')}>
          <input name={name} type="checkbox" {...inputProps} onChange={changeHandler} onBlur={blurHandler} />
          <span className="slider"></span>
          <strong>{label}</strong>
        </label>
      )
    case 'group':
    case 'tabs':
      return (
        <div className={classes.join(' ')}>
          <span className="header">{label}</span>
          <div className="options">{renderRadioOptions(props, options)}</div>
        </div>
      )
    default:
      return (
        <div className={classes.join(' ')}>
          {field}
          <label htmlFor={name}>{label}</label>
          <span />
        </div>
      )
  }
}

export default RadioField
