/**
 * @jsx createElement
 */
import { createElement, ReactNode, SFC, SyntheticEvent } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import { OptionsObject, SelectFieldProps } from './types'

const renderSelectOptions = (options?: OptionsObject): ReactNode => {
  const items = [<option key="default" />]

  if (!options) {
    return items
  }

  Object.keys(options).forEach(k =>
    items.push(
      <option key={k} value={k}>
        {options[k].label}
      </option>
    )
  )

  return items
}

const SelectField: SFC<SelectFieldProps> = ({ name, type, label, options, valid, validate, onValidate, onValid, onInvalid, onChange, ...inputProps }) => {
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

  const changeHandler = (e: SyntheticEvent<HTMLSelectElement>): void => {
    if (validate && !valid) {
      validateHandler(e.currentTarget.value)
    }

    onChange(e)
  }

  const blurHandler = (e: SyntheticEvent<HTMLSelectElement>): void => {
    if (validate) {
      validateHandler(e.currentTarget.value)
    }
  }

  return (
    <div className={classes.join(' ')}>
      <select name={name} {...inputProps} onChange={changeHandler} onBlur={blurHandler}>
        {renderSelectOptions(options)}
      </select>
      <label htmlFor={name}>{label}</label>
      <ChevronDownIcon />
      <span />
    </div>
  )
}

export default SelectField
