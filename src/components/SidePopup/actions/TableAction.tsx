import { FC, useState } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import ScrollTable from 'components/Table/ScrollTable'

import { IStepTable } from 'types/sidePopup'

import actionsStyles from './styles.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import useTable from 'components/Table/useTable'
import radioStyles from 'components/parts/RadioGroup/RadioGroup.module.scss'

const header = ['', 'Название', 'Дата редактирования']

const TableAction: FC = () => {
  const { action, setTempSettings, currentSettings } = usePopupContext()
  const settingName = 'smsId'
  const actionName = action.name
  const defaultValue = null

  const [radioSelected, setRadioSelected] = useState<string | undefined | null>(null)

  const currentValue =
    currentSettings && currentSettings[actionName] && currentSettings[actionName][settingName]
      ? currentSettings[actionName][settingName]
      : defaultValue

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const newValue = id === radioSelected ? null : (id || 0).toString()

    const newState = {
      ...currentSettings,
      [actionName]: {
        ...(currentSettings && currentSettings[actionName]),
        [settingName]: newValue,
      },
    }

    setTempSettings(newState)
    setRadioSelected(newValue)
  }

  const tableData = [
    //get from url
    { id: '1', name: 'email-name', date: '2022.14.08' },
    { id: '2', name: 'email-name', date: '2022.14.08' },
    { id: '3', name: 'email-name', date: '2022.14.08' },
    { id: '4', name: 'email-name', date: '2022.14.08' },
    { id: '5', name: 'email-name', date: '2022.14.08' },
    { id: '6', name: 'email-name', date: '2022.14.08' },
  ]

  const isRadioSelected = (id: string | undefined | null) => currentValue === id

  return (
    <div className={actionsStyles.tableWrapper}>
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        totalCountOfData={10}
      >
        {tableData.map((row, index) => {
          const { id, name, date } = tableData[index]
          return (
            <div className={cx(tableStyles.row)} key={index} onClick={handleChange} data-id={id}>
              <div className={cx(tableStyles.cell, tableStyles.cellCheck)}>
                <input
                  type="radio"
                  checked={isRadioSelected(id)}
                  className={cx(radioStyles.radioInput)}
                  id={id}
                ></input>
                <label htmlFor={id}></label>
              </div>
              <div className={cx(tableStyles.cell)}>{name}</div>
              <div className={cx(tableStyles.cell)}>{date}</div>
            </div>
          )
        })}
      </ScrollTable>
    </div>
  )
}

export default TableAction
