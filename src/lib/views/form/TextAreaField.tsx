/**
 * @jsx createElement
 */
import { createElement, SFC, SyntheticEvent, useState } from 'react'
import { FieldProps } from './types'

export interface TextAreaFieldProps extends FieldProps {
  type: 'textarea'
  onChange: (e: SyntheticEvent<HTMLTextAreaElement>) => void
}

const TextAreaField: SFC<TextAreaFieldProps> = ({ name, type, label, validate, onValid, onInvalid, onChange, ...inputProps }) => {
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

  const changeHandler = (e: React.SyntheticEvent<HTMLTextAreaElement>): void => {
    if (validate && !valid) {
      validateHandler(e.currentTarget.value)
    }

    onChange(e)
  }

  const blurHandler = (e: React.SyntheticEvent<HTMLTextAreaElement>): void => {
    if (validate) {
      validateHandler(e.currentTarget.value)
    }
  }

  return (
    <div className={classes.join(' ')}>
      <textarea name={name} {...inputProps} onChange={changeHandler} onBlur={blurHandler}></textarea>
      <label htmlFor={name}>{label}</label>
      <span />
    </div>
  )
}

export default TextAreaField
