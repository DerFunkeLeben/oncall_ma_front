import { FC, useEffect, useState } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import ScrollTable from 'components/Table/ScrollTable'

import { IAction } from 'types/sidePopup'

import actionsStyles from './styles.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import useTable from 'components/Table/useTable'
import radioStyles from 'components/parts/RadioGroup/RadioGroup.module.scss'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'

const header = ['', 'Название', 'Дата редактирования']

const TableAction: FC<IAction> = ({ settingName, applySettings }) => {
  const { step, setTempSettings, tempSettings, savedSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name
  const defaultValue = null

  const [radioSelected, setRadioSelected] = useState<string | undefined | null>(null)

  const currentValue =
    tempSettings && tempSettings[actionName] && tempSettings[actionName][settingName]
      ? tempSettings[actionName][settingName]
      : defaultValue

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const newValue = id === radioSelected ? null : (id || 0).toString()

    applySettings(newValue, tempSettings, updateTempSettings)
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
