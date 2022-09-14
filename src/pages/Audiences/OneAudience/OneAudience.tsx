import { ChangeEvent, FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { OneAudienceTable } from './OneAudienceTable'

import useToggle from 'hooks/useToggle'
import useDoctors from 'store/doctors/useDoctors'
import useFilterState from 'components/SidePopup/actions/FilterAction/useFilterState'

import { AudienceAction, DoctorKeys } from 'constants/audience'
import { AUDIENCE_URL_CREATE, PagesData } from 'constants/url'
import { IPageData } from 'types'
import { ISidePopupStep } from 'types/sidePopup'
import { IAudienceMetaData } from 'types/audience'

import styles from './OneAudience.module.scss'
import useCurrentAudience from 'store/audiences/useCurrentAudience'
import { Conditions } from 'constants/sidePopup'
import { postAxiosSingle } from 'utils/axios'
import { useAudienceFolders } from 'store/folders/useAllFolders'

const initData = {
  id: '0',
  name: 'Аудитория',
  peoplecount: '0',
  createdat: '',
  updatedat: '',
  query: {
    and: [{ field: DoctorKeys.specialty, type: Conditions.CONTAINS, value: ' ' }],
  },
}

const configFilter: ISidePopupStep = {
  name: 'filter',
  type: 'filter',
  attributes: Object.keys(DoctorKeys),
}

const OneAudience: FC<IPageData> = () => {
  const { currentAudience } = useCurrentAudience()
  const { allDoctors, fetchAllDoctors, clearDoctors, fetchAudienceDoctors } = useDoctors()
  const [audienceInfo, setAudienceInfo] = useState<IAudienceMetaData>(initData)
  const [filterisOpen, toggleFilterPopup] = useToggle()
  const { activeFolderName } = useAudienceFolders()

  const filterStateManager = useFilterState()
  const { parseStateToQuery } = filterStateManager

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAudienceInfo({
      ...audienceInfo,
      name: event.target.value,
    })
  }

  const handleFiltersSave = () => {
    setAudienceInfo({
      ...audienceInfo,
      query: parseStateToQuery(),
    })
  }

  const handleSave = async () => {
    const audienceCreateDto = {
      query: audienceInfo.query,
      name: audienceInfo.name,
      group: activeFolderName,
    }

    const result = await postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
    console.log(result)
  }

  useEffect(() => {
    if (currentAudience.action === AudienceAction.CREATE_CRM) {
      fetchAllDoctors()
    } else if (currentAudience.action === AudienceAction.EDIT) {
      fetchAudienceDoctors(currentAudience.audience.id)
    }

    return clearDoctors
  }, [currentAudience.audience])

  useEffect(() => {
    setAudienceInfo({
      ...initData,
      name: currentAudience?.audience?.name || initData.name,
      createdat: currentAudience?.audience?.createdat || initData.createdat,
      updatedat: currentAudience?.audience?.updatedat || initData.updatedat,
      peoplecount: `${allDoctors.length}`,
    })
  }, [allDoctors])

  return (
    <>
      <div className={cx(styles.pageContent)}>
        <AudienceHead
          audienceInfo={audienceInfo}
          openFilter={toggleFilterPopup}
          handleChange={handleTitleChange}
          handleSave={handleSave}
        />
        <OneAudienceTable allDoctors={allDoctors} />
      </div>
      <SidePopup
        isOpen={filterisOpen}
        close={toggleFilterPopup}
        config={configFilter}
        handleSave={handleFiltersSave}
        title={'Фильтры'}
        settings={filterStateManager}
      />
    </>
  )
}

export default OneAudience
