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
import useAllContent from 'store/content/useAllContent'
import { ddmmyyyy } from 'utils/transformDate'

import { EVENT_URL_ADD, EVENT_URL_ALL, EVENT_URL_VALIDATE } from 'constants/url'
import { getAxiosSingle } from 'utils/axios'
import { IContentHTML } from 'types/content'

const header = ['', 'Название', 'Дата редактирования']

const TableAction: FC<IAction> = ({ settingName, applySettings, url }) => {
  const [radioSelected, setRadioSelected] = useState<string | undefined | null>(null)

  const { allContent } = useAllContent()
  const [tableData, setTableData] = useState<IContentHTML[]>([])
  const { step, setTempSettings, tempSettings, savedSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()

  const defaultValue = null
  const currentValue =
    tempSettings && tempSettings[settingName] ? tempSettings[settingName] : defaultValue

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const newId = id === radioSelected ? null : (id || 0).toString()

    const allLineData = tableData.filter((tableLine) => tableLine.id === newId)[0]

    applySettings(allLineData, tempSettings, updateTempSettings)

    setRadioSelected(newId)
  }

  useEffect(() => {
    const emails = allContent.filter((e) => e.type === 'HTML') as IContentHTML[]
    setTableData(emails)
  }, [])

  const isRadioSelected = (id: string | undefined | null) => currentValue === id

  return (
    <div className={actionsStyles.tableWrapper}>
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        totalCountOfData={10}
      >
        {tableData.map((row, index) => {
          const { id, title, createDate } = tableData[index]
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
              <div className={cx(tableStyles.cell)}>{title}</div>
              <div className={cx(tableStyles.cell)}>{ddmmyyyy(createDate)}</div>
            </div>
          )
        })}
      </ScrollTable>
    </div>
  )
}

export default TableAction
