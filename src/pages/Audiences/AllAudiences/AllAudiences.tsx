import { FC } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import styles from './AllAudiences.module.scss'
import buttonStyles from '../../../components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'

import { IPageData } from 'types'
import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/MyDropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const goToSubPage = (name: string) => () => history.push(`${url}/${name}`)

  const dropDownConfig = [
    { name: 'Из CRM', action: goToSubPage('fakeID') },
    { name: 'Из готовой аудитории', action: () => console.log('Попап из готовой') },
    { name: 'Новая', action: goToSubPage('create_new') },
  ]

  // const tableConfig = [
  //   {
  //     id: 'id',
  //     name: 'ID',
  //     type: 'number',
  //   },
  //   {
  //     id: 'name',
  //     name: 'Название',
  //     type: 'string',
  //   },
  //   {
  //     id: 'contact_count',
  //     name: 'Количество контактов',
  //     type: 'number',
  //   },
  //   {
  //     id: 'create_date',
  //     name: 'Дата создания',
  //     type: 'date',
  //   },
  //   {
  //     id: 'change_date',
  //     name: 'Дата изменения',
  //     type: 'date',
  //   },
  // ]

  const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

  // const getData = (query: string) => {
  //   console.log(query)
  // }

  const data = [
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
    {
      id: 2145,
      name: 'Терапевты март 2022',
      contact_count: '540',
      create_date: '26.02.2022',
      last_update_date: '27.02.2022',
    },
  ]

  const openAudience = () => {
    console.log('asd')
  }

  return (
    <div className={styles.pageContent}>
      <PageHead title="Аудитории" subtitle="Вы можете создать или редактировать аудиторию">
        <Button modificator={buttonStyles.theme_secondary}>
          <p>Загрузить аудиторию</p>
        </Button>
        <DropDown name="Создать аудиторию" config={dropDownConfig} />
      </PageHead>
      <ScrollTable headers={header} handleScrollLimit={() => console.log('handleScrollLimit')}>
        {data.map((dataRow, index) => {
          const { id, name, contact_count, create_date, last_update_date } = dataRow
          return (
            <div className={tableStyles.row} key={id + index}>
              <div className="check"></div>
              <p className={cx(tableStyles.cell, 'text_1')}>{id}</p>
              <p className={cx(tableStyles.cell)}>
                <button className={'text_1_hl_2'} onClick={openAudience}>
                  {name}
                </button>
              </p>
              <p className={cx(tableStyles.cell, 'text_1')}>{contact_count}</p>
              <p className={cx(tableStyles.cell, 'text_1')}>{create_date}</p>
              <p className={cx(tableStyles.cell, 'text_1')}>{last_update_date}</p>
            </div>
          )
        })}
      </ScrollTable>
    </div>
  )
}

export default AllAudiences
