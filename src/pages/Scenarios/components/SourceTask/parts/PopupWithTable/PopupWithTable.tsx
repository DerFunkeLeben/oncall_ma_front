import { FC, useState } from 'react'
import cx from 'classnames'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Popup from 'containers/Popup/Popup'
import ScrollTable from 'components/Table/ScrollTable'
import Button from 'components/parts/Button/Button'

import styles from './PopupWithTable.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import radioStyles from 'components/parts/RadioGroup/RadioGroup.module.scss'
import { IAudienceMetaData } from 'types/audience'
import { ddmmyyyy } from 'utils/transformDate'

interface IPopupWithTable {
  isOpen: boolean
  close: () => void
  allAudiences: IAudienceMetaData[]
  submitAction: (audienceId: string) => void
}

const tableHeader = ['Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

const PopupWithTable: FC<IPopupWithTable> = ({ isOpen, close, allAudiences, submitAction }) => {
  const [radioSelected, setRadioSelected] = useState<string | undefined | null>(null)

  const isRadioSelected = (id: string | undefined | null) => radioSelected === id

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const audienceId = event.currentTarget.dataset.id
    if (!audienceId) return
    setRadioSelected(audienceId)
  }

  const save = () => {
    if (!radioSelected) return
    submitAction(radioSelected)
    close()
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
          leftRightScrollEnabled={true}
        >
          {allAudiences.map((dataRow, index) => {
            const { id, name, peoplecount, createdat, updatedat } = dataRow
            return (
              <div
                className={tableStyles.row}
                key={index}
                onClick={handleClick}
                data-id={id}
                data-name={name}
              >
                <div className={cx(tableStyles.cell, tableStyles.cellCheck)}>
                  <input
                    type="radio"
                    checked={isRadioSelected(id)}
                    onChange={() => console.log('change')}
                    className={cx(radioStyles.radioInput)}
                    id={id}
                  ></input>
                  <label htmlFor={id}></label>
                </div>
                <div className={cx(tableStyles.cell, tableStyles.accentCell, 'text_1_hl_1')}>
                  <span>{name}</span>
                </div>
                <div className={cx(tableStyles.cell, 'text_1')}>{peoplecount}</div>
                <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(createdat)}</div>
                <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(updatedat)}</div>
              </div>
            )
          })}
        </ScrollTable>
      </div>
      <div className={styles.popupControls}>
        <Button onClick={close} modificator={buttonStyles.theme_secondary}>
          Отменить
        </Button>
        <Button onClick={save}>Выбрать</Button>
      </div>
    </Popup>
  )
}

export default PopupWithTable
