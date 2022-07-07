import { FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import ScrollTable from 'components/Table/ScrollTable'
import InputBase from 'components/parts/InputBase/InputBase'
import useTable from 'components/Table/useTable'
import SidePopup from 'components/SidePopup/SidePopup'

import styles from './OneAudience.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'

import { IPageData } from 'types'
import { IStep } from 'types/sidePopup'
import { IconCheck, IconExport, IconFilters, IconRefresh } from 'assets/icons'

import { data } from './audienceTerapistMarch'
import { data as audiencesData } from '../AllAudiences/audiencesData'

interface IAudienceMetaData {
  id: number
  name: string
  contact_count: string
  create_date: string
  last_update_date: string
}

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
const initData = {
  id: 0,
  name: '',
  contact_count: '',
  create_date: '',
  last_update_date: '',
}

const title = 'Фильтры'

const configTest: IStep = {
  name: 'Длительность',
  type: 'duration',
  title: 'Установите продолжительность теста',
  getNextStep: () => {
    return {
      name: 'ТекстАреа',
      type: 'textarea',
      title: 'Аудитория',
      getNextStep: () => {
        return {
          name: 'ТекстИнпут',
          type: 'inputs',
          title: 'Аудитория',
          getNextStep: () => {
            return {
              name: 'Слайдер',
              type: 'slider',
              title: 'Выберите процент аудитории для тестирования',
              getNextStep: () => {
                return {
                  name: 'СлайдерСоотношение',
                  type: 'sliderRelation',
                  title: 'Выберите процент аудитории для тестирования',
                  count: 2,
                  getNextStep: () => {
                    return {
                      name: 'Радио',
                      type: 'radiogroup',
                      options: [
                        { name: 'deliveryRate', label: 'delivery rate 11' },
                        { name: 'openRate', label: 'open rate 444212' },
                        { name: 'clickRate', label: 'click rate' },
                        { name: 'unsubscribeRate', label: 'unsub rate' },
                      ],
                      getNextStep: () => {
                        return {
                          name: 'Фильтр',
                          type: 'filter',
                          title: 'Аудитория',
                          getNextStep: () => {
                            return {
                              name: 'Таблица',
                              type: 'table',
                              title: 'Аудитория',
                            }
                          },
                        }
                      },
                    }
                  },
                }
              },
            }
          },
        }
      },
    }
  },
}

const config = configTest

const OneAudience: FC<IPageData> = () => {
  const { toggleCheck, isItChecked, checkedCount } = useTable()
  const { audienceid } = useParams<{ audienceid?: string }>()
  const [audienceInfo, setAudienceInfo] = useState<IAudienceMetaData>(initData)
  const [filterisOpen, setFilterisOpen] = useState(false)
  const [sidePopupState, setSidePopupState] = useState({})

  const totalCountOfData = data.length

  const openFilter = () => setFilterisOpen(true)
  const closeFilter = () => setFilterisOpen(false)

  useEffect(() => {
    if (!audienceid) return
    const audienceIdNumber = Number(audienceid)
    setAudienceInfo(audiencesData.filter((audience) => audience.id === audienceIdNumber)[0])
  }, [audienceid])

  // useEffect(() => {
  //   console.log(sidePopupState)
  // }, [sidePopupState])

  return (
    <>
      <div className={cx(styles.pageContent)}>
        <PageHead
          mod={true}
          title={audienceInfo.name}
          contactCount={audienceInfo.contact_count}
          createDate={audienceInfo.create_date}
          lastUpdateDate={audienceInfo.last_update_date}
          buttonBackName="К списку аудиторий"
          buttonBackUrl="/audences"
          separateBlock={
            <InputBase
              placeholder="Поиск по названию"
              icon={true}
              handleInputChange={() => console.log('asd')}
            />
          }
        >
          <Button modificator={buttonStyles.theme_secondary} onClick={openFilter}>
            <IconFilters />
            <span>Фильтры</span>
          </Button>
          <Button modificator={buttonStyles.theme_secondary}>
            <IconExport />
            <span>Экспорт</span>
          </Button>
          <Button modificator={buttonStyles.theme_secondary}>
            <IconRefresh />
            <span>Обновить</span>
          </Button>
          <Button>
            <span>Сохранить</span>
          </Button>
        </PageHead>
        <ScrollTable
          headers={header}
          handleScrollLimit={() => console.log('handleScrollLimit')}
          checkedCount={checkedCount}
          totalCountOfData={totalCountOfData}
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
      <SidePopup
        isOpen={filterisOpen}
        close={closeFilter}
        config={config}
        handleSave={setSidePopupState}
        title={title}
      />
    </>
  )
}

export default OneAudience
