import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useMessageBoxContext from 'context/MessageBoxContext'
import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { CheckMenuAction } from 'types'

import { IconCheck } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'
import { IDoctor } from 'types/audience'
import useDoctors from 'store/doctors/useDoctors'
import EmptyTable from './EmptyTable'

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
  // 'Специальность',
  // 'Сегмент',
]

export const OneAudienceTable = ({ allDoctors }: { allDoctors: IDoctor[] }) => {
  const { doctorsIds, doctorsCount } = useDoctors()
  const { toggleCheck, isItChecked, checkedCount, checkedAll, toggleAllChecks, clearChecks } =
    useTable(doctorsIds)
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
      option: CheckMenuAction.COPY,
      handleClick: () => console.log('HANDLE COPY'),
    },
    {
      option: CheckMenuAction.DELETE,
      handleClick: deleteAudience,
    },
  ]

  if (!doctorsCount) return <EmptyTable />

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
        const fieldsKeys = ['lastName', 'firstName', 'middleName', 'email', 'phone', 'city']
        const fields = [lastName, firstName, middleName, email, phone, city]

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
            <div className={cx(tableStyles.cell)}>{id}</div>
            {fields.map((field, i) => {
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
