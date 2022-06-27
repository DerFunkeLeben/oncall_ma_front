import { FC, useState } from 'react'
import cx from 'classnames'
import { useHistory, useRouteMatch, useParams } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'
import CheckMenu from 'components/Table/CheckMenu/CheckMenu'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'

import styles from './OneAudience.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import checkMenuStyles from 'components/Table/CheckMenu/CheckMenu.module.scss'
import ddStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'
import { IconCheck, IconCopy, IconTrash, IconUpload, IconLoupe } from 'assets/icons'

import { data } from './audienceTerapistMarch'
const header = [
  '',
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

const OneAudience: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { audienceid } = useParams<{ audienceid?: string }>()

  const [checkedList, setCheckedList] = useState<number[]>([])

  const totalCountOFData = data.length
  const checkedCount = checkedList.length

  const isItChecked = (id: number) => {
    return checkedList.includes(id)
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const toggleCheck = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const idNum = Number(id)
    if (isItChecked(idNum)) {
      const newChecked = checkedList.filter((el) => el !== idNum)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, idNum])
  }

  return (
    <div className={cx(styles.pageContent)}>
      <PageHead
        mod={true}
        title="Аудитории"
        buttonBackName="К списку аудиторий"
        buttonBackUrl="/audences"
        leftSide={
          <InputBase
            placeholder="Поиск по названию"
            icon={true}
            handleInputChange={() => console.log('asd')}
          ></InputBase>
        }
      >
        <Button modificator={buttonStyles.theme_secondary}>
          <IconUpload />
          <span>Загрузить аудиторию</span>
        </Button>
      </PageHead>
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        checkMenu={
          checkMenuIsOpen() && (
            <CheckMenu checkedCount={checkedCount} total={totalCountOFData}>
              <button className={cx(checkMenuStyles.button, 'text_1')}>
                <IconCopy className={checkMenuStyles.buttonIcon} />
                Копировать
              </button>
              <button className={cx(checkMenuStyles.button, checkMenuStyles.alarm, 'text_1')}>
                <IconTrash className={checkMenuStyles.buttonIcon} />
                Удалить
              </button>
            </CheckMenu>
          )
        }
      >
        {data.map((dataRow, index) => {
          const { id, lastName, firstName, patronym, email, phone, city, speciality, segment } =
            dataRow
          const checked = isItChecked(index)
          return (
            <div className={tableStyles.row} key={index} data-id={id}>
              <div
                className={cx(tableStyles.cell, tableStyles.cellCheck)}
                onClick={toggleCheck}
                data-id={index}
              >
                <div
                  className={cx(tableStyles.check, {
                    [tableStyles.checked]: checked,
                  })}
                >
                  {checked && <IconCheck />}
                </div>
              </div>
              <div className={cx(tableStyles.cell, 'text_1')}>{index}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{lastName}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{firstName}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{patronym}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{email}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{phone}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{city}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{speciality}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{segment}</div>
            </div>
          )
        })}
        {true && <EmptyRow />}
      </ScrollTable>
    </div>
  )
}

const EmptyRow = () => (
  <div className={tableStyles.row}>
    <div className={tableStyles.cell}></div>
  </div>
)

export default OneAudience
