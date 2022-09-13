import { ChangeEvent, FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { OneAudienceTable } from './OneAudienceTable'

import useToggle from 'hooks/useToggle'
import useDoctors from 'store/doctors/useDoctors'
import useFilterState from 'components/SidePopup/actions/FilterAction/useFilterState'

import { DoctorKeys } from 'constants/audience'
import { AUDIENCE_URL_ONE, PagesData } from 'constants/url'
import { IPageData } from 'types'
import { ISidePopupStep } from 'types/sidePopup'
import { IAudienceMetaData } from 'types/audience'

import styles from './OneAudience.module.scss'
import { getAxiosSingle } from 'utils/axios'

const initData = {
  id: '0',
  name: 'Аудитория',
  peoplecount: '',
  createdat: '',
  updatedat: '',
  filterQuery: {},
}

const configFilter: ISidePopupStep = {
  name: 'filter',
  type: 'filter',
  attributes: Object.keys(DoctorKeys),
}

const OneAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid: string }>()
  const { allDoctors, fetchDoctors, clearDoctors } = useDoctors()
  const [audienceInfo, setAudienceInfo] = useState<IAudienceMetaData>(initData)
  const [filterisOpen, toggleFilterPopup] = useToggle()
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
      filterQuery: parseStateToQuery(),
    })
  }

  useEffect(() => {
    const isCreateCrm = PagesData.CREATE_AUDIENCE_CRM.link.includes(audienceid)

    const getAudience = async () => {
      const data = await getAxiosSingle(`${AUDIENCE_URL_ONE}/${audienceid}`)
      console.log(data)
    }

    if (isCreateCrm) {
      fetchDoctors()
    } else {
      getAudience()
    }

    return clearDoctors
  }, [audienceid])

  useEffect(() => {
    setAudienceInfo({
      ...initData,
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
