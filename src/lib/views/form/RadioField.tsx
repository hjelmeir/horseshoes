/**
 * @jsx createElement
 */
import { createElement, ReactNode, SFC, SyntheticEvent } from 'react'
import { OptionsObject, RadioFieldProps } from './types'

const renderRadioOptions = (name: string, selected: string = '', onChange: (e: SyntheticEvent<HTMLInputElement>) => void, options?: OptionsObject): ReactNode => {
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

const RadioField: SFC<RadioFieldProps> = ({ name, type, label, options, validate, valid, onValidate, onValid, onInvalid, onChange, ...inputProps }) => {
  const classes = ['field', type, `valid-${valid}`]
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

    if (onValidate) {
      onValidate(isValid === true)
    }
  }

  const changeHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    if (validate && !valid) {
      validateHandler(e.currentTarget.value)
    }

    onChange(e)
  }

  const blurHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
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
          <div className="options">{renderRadioOptions(name, inputProps.selected, onChange, options)}</div>
        </div>
      )
    default:
      return (
        <div className={classes.join(' ')}>
          <label htmlFor={name}>{label}</label>
          <span />
        </div>
      )
  }
}

export default RadioField
