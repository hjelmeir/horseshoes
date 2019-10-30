/**
 * @jsx createElement
 */
import { createElement, SFC, SyntheticEvent } from 'react'
import { TextFieldProps } from './types'

const TextField: SFC<TextFieldProps> = ({ name, type, label, normalize, validate, valid, onValidate, onValid, onInvalid, onChange, ...inputProps }) => {
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

    if (normalize) {
      e.currentTarget.value = normalize(e.currentTarget.value)
    }

    onChange(e)
  }

  const blurHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    if (validate) {
      validateHandler(e.currentTarget.value)
    }
  }

  return (
    <div className={classes.join(' ')}>
      <input name={name} type={type} {...inputProps} onChange={changeHandler} onBlur={blurHandler} />
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default TextField
