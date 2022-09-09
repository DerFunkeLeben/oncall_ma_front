import { useEffect } from 'react'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import ContextMenu from '../../components/ContextMenu/ContextMenu'
import TableOneInput from './TableOneInput'
import EmptyTable from './EmptyTable'

import useTable from 'components/Table/useTable'
import useDoctors from 'store/doctors/useDoctors'
import useMessageBoxContext from 'context/MessageBoxContext'
import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { IDoctor } from 'types/audience'

import { IconCheck, IconCopy, IconTrash } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'

export const header = [
  '',
  '%%settings%%',
  'Фамилия',
  'Имя',
  'Отчество',
  'Email',
  'Телефон',
  'Город',
  // 'Специальность',
  // 'Сегмент',
]

export const CreateAudienceTable = () => {
  const {
    allDoctors,
    addDoctor,
    doctorsCount,
    doctorsIds,
    editDoctor,
    deleteDoctor,
    deleteMultipleDoctors,
    copyMultipleDoctors,
    clearDoctors,
  } = useDoctors()

  const {
    checkedList,
    toggleCheck,
    isItChecked,
    checkedCount,
    checkedAll,
    toggleAllChecks,
    clearChecks,
  } = useTable(doctorsIds)

  const { setMessageBox } = useMessageBoxContext()
  const { setAlertBox } = useAlertContext()

  const confirmDeleteMultiple = () => {
    deleteMultipleDoctors(checkedList)
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Удалено элементов: ${checkedCount}`,
      icon: AlertBoxIcons.DELETE,
    })
  }

  const handleDeleteMultiple = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm: confirmDeleteMultiple,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })
  }

  const handleCopyMultiple = () => {
    copyMultipleDoctors(checkedList)
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Скопировано элементов: ${checkedCount}`,
      icon: AlertBoxIcons.SUCCESS,
    })
  }

  const handleDeleteOne = (id: string) => {
    deleteDoctor(id)
    clearChecks()
  }

  const handleEdit = (id: string) => {
    console.log('DO EDIT') // TODO
  }

  const checkMenuConfig = [
    {
      caption: 'Копировать',
      Icon: IconCopy,
      handleClick: handleCopyMultiple,
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      handleClick: handleDeleteMultiple,
      modificators: ['alarm'],
    },
  ]

  useEffect(() => {
    clearDoctors()
  }, [])

  if (!doctorsCount) return <EmptyTable handleAddBtn={addDoctor} />

  return (
    <ScrollTable
      headers={header}
      handleScrollLimit={() => console.log('handleScrollLimit')}
      {...{
        checkedCount,
        checkedAll,
        checkMenuConfig,
        totalCountOfData: doctorsCount,
        toggleAllChecks,
        addBtnEnabled: true,
        handleAddBtn: addDoctor,
      }}
    >
      {allDoctors.map((dataRow, index) => {
        const id = doctorsIds[index]
        const {
          email,
          phone,
          specialty,
          secondSpecialty,
          firstName,
          lastName,
          middleName,
          organization,
          city,
          region,
          district,
          meta,
        } = dataRow

        // TODO срочно исправить
        const fieldsKeys = ['firstName', 'lastName', 'middleName', 'email', 'phone', 'city']
        const fields = [firstName, lastName, middleName, email, phone, city]

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
            <div className={cx(tableStyles.cell, tableStyles.dotsCell)}>
              <ContextMenu
                handleRemove={() => handleDeleteOne(id)}
                handleEdit={() => handleEdit(id)}
              />
            </div>
            {/* <div className={cx(tableStyles.cell)}>{index}</div> */}
            {fields.map((field, i) => {
              const fieldName = fieldsKeys[i] as keyof IDoctor
              return (
                <TableOneInput
                  key={i}
                  id={id}
                  // value={field}
                  name={fieldName}
                  editDoctor={editDoctor}
                />
              )
            })}
          </div>
        )
      })}
    </ScrollTable>
  )
}
