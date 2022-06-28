import { FC } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import ScrollTable from 'components/Table/ScrollTable'
import InputBase from 'components/parts/InputBase/InputBase'
import useTable from 'components/Table/useTable'

import styles from './OneAudience.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'

import { IPageData } from 'types'
import { IconCheck, IconUpload } from 'assets/icons'

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
  const { toggleCheck, isItChecked, checkedCount } = useTable()

  const totalCountOfData = data.length

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
        checkedCount={checkedCount}
        total={totalCountOfData}
      >
        {data.map((dataRow, index) => {
          const { id, lastName, firstName, patronym, email, phone, city, speciality, segment } =
            dataRow
          const checked = isItChecked(index)
          return (
            <div className={cx(tableStyles.row, 'text_1')} key={index} data-id={id}>
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
              <div className={cx(tableStyles.cell)}>{index}</div>
              <div className={cx(tableStyles.cell)}>{lastName}</div>
              <div className={cx(tableStyles.cell)}>{firstName}</div>
              <div className={cx(tableStyles.cell)}>{patronym}</div>
              <div className={cx(tableStyles.cell)}>{email}</div>
              <div className={cx(tableStyles.cell)}>{phone}</div>
              <div className={cx(tableStyles.cell)}>{city}</div>
              <div className={cx(tableStyles.cell)}>{speciality}</div>
              <div className={cx(tableStyles.cell)}>{segment}</div>
            </div>
          )
        })}
      </ScrollTable>
    </div>
  )
}

export default OneAudience
