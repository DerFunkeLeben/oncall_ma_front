import { FC } from 'react'
import cx from 'classnames'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Popup from 'containers/Popup/Popup'
import ScrollTable from 'components/Table/ScrollTable'
import Button from 'components/parts/Button/Button'

import styles from './PopupOfCreationFromExist.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

import { data as tableData } from '../audiencesData'

interface IPopupOfCreationFromExist {
  isOpen: boolean
  close: () => void
}

const tableHeader = ['Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

const PopupOfCreationFromExist: FC<IPopupOfCreationFromExist> = ({ isOpen, close }) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const openAudience = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    history.push(`${url}/${id}`)
  }
  return (
    <Popup isOpen={isOpen} close={close}>
      <div className={styles.popupTitleContainer}>
        <h2 className={cx(styles.popupTitle, 'header_2')}>Аудитории</h2>
      </div>
      <div className={styles.popupTable}>
        <ScrollTable
          headers={tableHeader}
          handleScrollLimit={() => console.log('handleScrollLimit')}
        >
          {tableData.map((dataRow, index) => {
            const { id, name, contact_count, create_date, last_update_date } = dataRow
            return (
              <div className={tableStyles.row} key={index} onClick={openAudience} data-id={id}>
                <div className={cx(tableStyles.cell, tableStyles.accentCell, 'text_1_hl_1')}>
                  <span>{name}</span>
                </div>
                <div className={cx(tableStyles.cell, 'text_1')}>{contact_count}</div>
                <div className={cx(tableStyles.cell, 'text_1')}>{create_date}</div>
                <div className={cx(tableStyles.cell, 'text_1')}>{last_update_date}</div>
              </div>
            )
          })}
        </ScrollTable>
      </div>
      <div className={styles.popupControls}>
        <Button onClick={close} modificator={buttonStyles.theme_secondary}>
          Отменить
        </Button>
        <Button>Выбрать</Button>
      </div>
    </Popup>
  )
}

export default PopupOfCreationFromExist
