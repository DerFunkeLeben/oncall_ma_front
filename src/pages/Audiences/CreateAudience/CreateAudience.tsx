import { ChangeEvent, FC, useEffect, useState } from 'react'
import cx from 'classnames'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { CreateAudienceTable } from './parts/CreateAudienceTable'

import useToggle from 'hooks/useToggle'
import { IPageData } from 'types'
import { ISidePopupStep } from 'types/sidePopup'
import { IAudienceMetaData } from 'types/audience'
import { getToday } from 'utils/transformDate'

import styles from './CreateAudience.module.scss'
import { postAxiosSingle } from 'utils/axios'
import { DOCTORS_URL_ADD } from 'constants/url'
import useDoctors from 'store/doctors/useDoctors'

const initData = {
  id: '0',
  name: 'Аудитория',
  peoplecount: '0',
  createdat: getToday(),
  updatedat: '',
  query: '',
}

const title = 'Фильтры'

const configTest: ISidePopupStep = {
  name: 'filter',
  type: 'filter',
  attributes: [
    'Фамилия',
    'Имя',
    'Отчество',
    'Email',
    'Телефон',
    'Город',
    'Специальность',
    'Сегмент',
  ],
}

const config = configTest

const CreateAudience: FC<IPageData> = () => {
  const [audienceInfo, setAudienceInfo] = useState<IAudienceMetaData>(initData)
  const [filterisOpen, toggleFilterPopup] = useToggle()
  const [sidePopupState, setSidePopupState] = useState({})
  const { allDoctors, doctorsCount } = useDoctors()

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAudienceInfo({
      ...audienceInfo,
      name: event.target.value,
    })
  }

  const handleSave = async () => {
    const result = await postAxiosSingle(DOCTORS_URL_ADD, {}, allDoctors)
    console.log(result)
  }

  useEffect(() => {
    setAudienceInfo({
      ...audienceInfo,
      peoplecount: `${doctorsCount}`,
    })
  }, [doctorsCount])

  return (
    <>
      <div className={cx(styles.pageContent)}>
        <AudienceHead
          audienceInfo={audienceInfo}
          openFilter={toggleFilterPopup}
          handleChange={handleTitleChange}
          handleSave={handleSave}
        />
        <CreateAudienceTable />
      </div>
      <SidePopup
        isOpen={filterisOpen}
        close={toggleFilterPopup}
        config={config}
        handleSave={setSidePopupState}
        title={title}
      />
    </>
  )
}

export default CreateAudience
