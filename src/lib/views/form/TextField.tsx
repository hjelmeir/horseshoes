/**
 * @jsx createElement
 */
import { createElement, SFC, useState } from 'react'
import { FieldProps } from './types'

interface TextFieldProps extends FieldProps {
  type: 'text' | 'email' | 'password'
  onChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

const TextField: SFC<TextFieldProps> = ({ name, type, label, validate, onValid, onInvalid, onChange, ...inputProps }) => {
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

  return (
    <div className={classes.join(' ')}>
      <input name={name} type={type} {...inputProps} onChange={changeHandler} onBlur={blurHandler} />
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default TextField
