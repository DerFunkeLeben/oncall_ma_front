import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import useDebounce from 'hooks/useDebounce'

import { IDoctorEditInfo } from 'types/audience'
import tableStyles from 'components/Table/TableBase.module.scss'
import inputStyles from 'components/parts/InputBase/InputBaseThemes.module.scss'

interface ITableOneInput {
  name: string
  id: string
  value: string | undefined
  editDoctor: (d: IDoctorEditInfo) => void
}
const TableOneInput: FC<ITableOneInput> = ({ name, id, value, editDoctor }) => {
  const [inputValue, setInputValue] = useState<string>('')
  const debouncedInput = useDebounce(inputValue, 350)
  const needRerender = useRef(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    needRerender.current = true
    setInputValue(event.target.value)
  }

  useEffect(() => {
    if (!needRerender.current) return

    editDoctor({
      id: id || '',
      field: name,
      value: debouncedInput,
    })
  }, [debouncedInput])

  useEffect(() => {
    needRerender.current = false
    setInputValue(value || '')
  }, [id])

  return (
    <InputBase
      wrapperModificator={cx(tableStyles.cell, inputStyles.wrapper_table_cell)}
      modificator={cx(inputStyles.theme_table_cell)}
      handleInputChange={handleInputChange}
      placeholder={'Введите текст'}
      name={name}
      value={inputValue}
      data-id={id}
    />
  )
}

export default TableOneInput
