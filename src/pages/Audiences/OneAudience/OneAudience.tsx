import { ChangeEvent, FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { OneAudienceTable } from './OneAudienceTable'

import useToggle from 'hooks/useToggle'
import { data as audiencesData } from '../AllAudiences/audiencesData'
import { IPageData } from 'types'
import { ISidePopupStep } from 'types/sidePopup'
import { IAudienceMetaData } from 'types/audience'

import styles from './OneAudience.module.scss'

const initData = {
  id: '0',
  name: '',
  contact_count: '',
  create_date: '',
  last_update_date: '',
}

const title = 'Фильтры'

const configFilter: ISidePopupStep = {
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

const OneAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  const [audienceInfo, setAudienceInfo] = useState<IAudienceMetaData>(initData)
  const [filterisOpen, toggleFilterPopup] = useToggle()
  const [sidePopupState, setSidePopupState] = useState({})

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAudienceInfo({
      ...audienceInfo,
      name: event.target.value,
    })
  }

  console.log(sidePopupState)
  useEffect(() => {
    if (!audienceid) return

    setAudienceInfo(audiencesData.filter((audience) => audience.id === audienceid)[0])
  }, [audienceid])

  return (
    <>
      <div className={cx(styles.pageContent)}>
        <AudienceHead
          audienceInfo={audienceInfo}
          openFilter={toggleFilterPopup}
          handleChange={handleTitleChange}
        />
        <OneAudienceTable />
      </div>
      <SidePopup
        isOpen={filterisOpen}
        close={toggleFilterPopup}
        config={configFilter}
        handleSave={setSidePopupState}
        title={title}
      />
    </>
  )
}

export default OneAudience
