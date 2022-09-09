import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useMessageBoxContext from 'context/MessageBoxContext'
import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'

import { data } from './audienceTerapistMarch'
import { IconCheck, IconCopy, IconTrash } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'

const header = [
  '',
  // '%%settings%%',
  'ID',
  'Фамилия',
  'Имя',
  'Отчество',
  'Email',
  'Телефон',
  'Город',
  'Специальность',
  'Сегмент',
]
const totalCountOfData = data.length
const allIds = data.map((el) => el.id)

export const OneAudienceTable = () => {
  const { toggleCheck, isItChecked, checkedCount, checkedAll, toggleAllChecks, clearChecks } =
    useTable(allIds)
  const { setMessageBox } = useMessageBoxContext()
  const { setAlertBox } = useAlertContext()

  const confirmDelete = () => {
    console.log('DO DELETE') // TODO
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Удалено элементов: ${checkedCount}`,
      icon: AlertBoxIcons.DELETE,
    })
  }

  const deleteAudience = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm: confirmDelete,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })
  }

  const handleRemove = () => {
    console.log('DO DELETE') // TODO
  }

  const handleEdit = () => {
    console.log('DO EDIT') // TODO
  }

  const checkMenuConfig = [
    {
      caption: 'Копировать',
      Icon: IconCopy,
      handleClick: () => console.log('HANDLE COPY'),
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      handleClick: deleteAudience,
      modificators: ['alarm'],
    },
  ]

  return (
    <ScrollTable
      headers={header}
      handleScrollLimit={() => console.log('handleScrollLimit')}
      {...{
        checkedCount,
        checkedAll,
        checkMenuConfig,
        totalCountOfData,
        toggleAllChecks,
      }}
    >
      {data.map((dataRow, index) => {
        const { id, lastName, firstName, patronym, email, phone, city, speciality, segment } =
          dataRow
        const editableFields = [
          lastName,
          firstName,
          patronym,
          email,
          phone,
          city,
          speciality,
          segment,
        ]
        const checked = isItChecked(id)
        return (
          <div className={cx(tableStyles.row, 'text_1')} key={index} data-id={id}>
            <div
              className={cx(tableStyles.cell, tableStyles.cellCheck)}
              onClick={toggleCheck}
              data-id={id}
            >
              <div
                className={cx(tableStyles.check, {
                  [tableStyles.checked]: checked,
                })}
              >
                {checked && <IconCheck />}
              </div>
            </div>
            <div className={cx(tableStyles.cell)}>{index}</div>
            {editableFields.map((field, i) => {
              return (
                <div className={cx(tableStyles.cell)} key={i}>
                  {field}
                </div>
              )
            })}
          </div>
        )
      })}
    </ScrollTable>
  )
}
