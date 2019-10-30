/**
 * @jsx createElement
 */
import { compact, uniq } from 'lodash'
import { createElement, FC, Fragment, ReactNode, SyntheticEvent, useState } from 'react'
import ChevronDownIcon from '../icons/ChevronDownIcon'
import CloseIcon from '../icons/CloseIcon'
import { SelectFieldProps } from './types'

const normalizeSelected = (values: any[]): string[] => {
  return uniq(compact(values).map(v => v.toString()))
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  type,
  searchable,
  label,
  options,
  valid,
  normalize,
  validate,
  onValid,
  onValidate,
  onInvalid,
  onChange,
  multiple,
  selectHandler,
  selectedValues,
  ...inputProps
}) => {
  const selected = (selectedValues && normalizeSelected(selectedValues)) || []
  const [searchText, setSearchText] = useState('')

  const classes = ['field', type, `valid-${valid}`]
  multiple ? classes.push('multi') : classes.push('single')
  searchable ? classes.push('searchable') : classes.push('not-searchable')
  validate && valid ? classes.push('valid') : classes.push('invalid')

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

  const renderSelectOptions = (): ReactNode => {
    const items = [
      <option key="default" value="select">
        Select
      </option>
    ]

    if (!options) {
      return items
    }

    Object.keys(options).forEach(k =>
      items.push(
        <option key={k} value={k.toString()}>
          {options[k].label || options[k].toString()}
        </option>
      )
    )

    return items
  }

  const searchTextHandler = (e: SyntheticEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value)
  }

  const deleteLabelHandler = (e: SyntheticEvent<HTMLButtonElement>): void => {
    e.preventDefault()

    if (selectHandler) {
      selectHandler(normalizeSelected(selected.filter(id => id !== e.currentTarget.value)))
    }
  }

  const changeHandler = (e: SyntheticEvent<HTMLSelectElement>): void => {
    e.preventDefault()

    if (validate && !valid) {
      validateHandler(e.currentTarget.value)
    }

    if (normalize) {
      e.currentTarget.value = normalize(e.currentTarget.value)
    }

    if (validate && !valid) {
      validate(e.currentTarget.value)
    }

    if (onChange) {
      onChange(e)
    }

    if (selectHandler) {
      selectHandler(normalizeSelected(selected.concat([e.currentTarget.value])))
    }
  }

  const blurHandler = (e: SyntheticEvent<HTMLSelectElement>): void => {
    if (validate) {
      validateHandler(e.currentTarget.value)
    }
  }

  const renderTags = (): ReactNode => {
    const tags = normalizeSelected(selected).map(v => {
      if (!options || !options[v]) {
        return null
      }

      return (
        <span key={`${name}-option-${v}`}>
          <b>{options[v].label}</b>
          <button onClick={deleteLabelHandler} value={v}>
            <CloseIcon />
          </button>
        </span>
      )
    })

    return <div className="tags">{tags}</div>
  }

  return (
    <Fragment>
      <div className={classes.join(' ')}>
        <select name={name} {...inputProps} onChange={changeHandler} onBlur={blurHandler}>
          {renderSelectOptions()}
        </select>

        <label htmlFor={name}>{label}</label>

        <ChevronDownIcon />

        {searchable && options && <input type="text" value={searchText} onChange={searchTextHandler} />}

        {multiple && options && selectHandler && renderTags()}
      </div>
    </Fragment>
  )
}


export default SelectField
