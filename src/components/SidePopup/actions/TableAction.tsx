import { FC, useEffect, useState, useCallback } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import ScrollTable from 'components/Table/ScrollTable'

import { IAction } from 'types/sidePopup'

import actionsStyles from './styles.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import useTable from 'components/Table/useTable'
import radioStyles from 'components/parts/RadioGroup/RadioGroup.module.scss'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
import { ddmmyyyy } from 'utils/transformDate'
import { decodeFileName } from 'utils'

import { getAxiosArr } from 'utils/axios'
import { IContent } from 'types/content'

const header = ['', 'Название', 'Дата редактирования']

const TableAction: FC<IAction> = ({ settingName, applySettings, url }) => {
  const [radioSelected, setRadioSelected] = useState<string | undefined | null>(null)
  const [tableData, setTableData] = useState<IContent[]>([])
  const { step, setTempSettings, tempSettings, savedSettings } = usePopupContext()
  const [allContent, setAllContent] = useState<any[]>([])
  const { updateTempSettings } = useSidePopup()

  const getAllContent = useCallback(async () => {
    const content = await getAxiosArr(url as string)

    // TODO поменять получаемый объект на бэке
    setAllContent(() => content)
  }, [])

  useEffect(() => {
    getAllContent()
  }, [])

  const defaultValue = null
  const currentValue =
    tempSettings && tempSettings[settingName] ? tempSettings[settingName] : defaultValue

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const newId = id === radioSelected ? null : (id || 0).toString()

    const allLineData = allContent.filter((tableLine) => tableLine.id === newId)[0]

    applySettings(allLineData, tempSettings, updateTempSettings)

    setRadioSelected(newId)
  }

  const isRadioSelected = (id: string | undefined | null) => currentValue === id

  return (
    <div className={actionsStyles.tableWrapper}>
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        totalCountOfData={10}
      >
        {allContent.map((row, index) => {
          const { id, title, createdAt, originalName } = allContent[index]
          console.log(allContent[index])
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
              <div className={cx(tableStyles.cell)}>{decodeFileName(originalName)}</div>
              <div className={cx(tableStyles.cell)}>{ddmmyyyy(createdAt)}</div>
            </div>
          )
        })}
      </ScrollTable>
    </div>
  )
}

export default TableAction
