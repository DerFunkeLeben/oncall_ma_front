import { ChangeEvent, FC, useEffect, useState } from 'react'
import cx from 'classnames'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { OneAudienceTable } from './OneAudienceTable'

import useToggle from 'hooks/useToggle'
import useDoctors from 'store/doctors/useDoctors'

import { AudienceAction, DoctorKeys, INIT_AUDIENCE } from 'constants/audience'
import { AUDIENCE_URL_CREATE, AUDIENCE_URL_ONE, DOCTORS_URL, PagesData } from 'constants/url'
import { IPageData } from 'types'
import { IStep } from 'types/sidePopup'
import { IAudienceMetaData } from 'types/audience'

import styles from './OneAudience.module.scss'
import useCurrentAudience from 'store/audiences/useCurrentAudience'
import { SidePopupActions } from 'constants/sidePopup'

import { getAxiosArr, getAxiosSingle, postAxiosSingle } from 'utils/axios'
import { useAudienceFolders } from 'store/folders/useAllFolders'
import {
  parseStateToQuery,
  parseQueryToState,
} from '../../../components/SidePopup/actions/FilterAction/utils'
import { IFilterState } from 'components/SidePopup/actions/FilterAction/types'
import { useHistory, useLocation, useParams } from 'react-router-dom'

const configFilter: IStep = {
  name: 'filter',
  title: 'Фильтры',
  actions: [
    {
      type: SidePopupActions.FILTER,
      settingName: 'filter',
      attributes: Object.keys(DoctorKeys),

      applySettings: (newState: any, settings: any, updateTempSettings: any) => {
        updateTempSettings('filter', [{ ...settings.filter, ...newState }])
      },
    },
  ],
}

const OneAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  const history = useHistory()
  const location = useLocation()

  const { currentAudience, setCurrentAudience, updateAudienceInfo } = useCurrentAudience()
  const { allDoctors, clearDoctors, addManyDoctors } = useDoctors()
  const { activeFolderName } = useAudienceFolders()

  const [filterisOpen, toggleFilterPopup] = useToggle()
  const [filterState, setFilterState] = useState({})

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateAudienceInfo({
      ...currentAudience.audience,
      name: event.target.value,
    })
  }

  const handleFiltersSave = (tempSettings: { filter: IFilterState }) => {
    updateAudienceInfo({
      ...currentAudience.audience,
      query: parseStateToQuery(tempSettings.filter),
    })
  }

  const handleSave = async () => {
    const audienceCreateDto = {
      query: currentAudience.audience.query,
      name: currentAudience.audience.name,
      group: activeFolderName,
    }

    const result = await postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
    console.log(result)
  }

  useEffect(() => {
    const query = currentAudience.audience.query
    const state = parseQueryToState(query)

    setFilterState(state)
  }, [filterisOpen])

  useEffect(() => {
    const getAudienceDoctors = async () => {
      const audience = await getAxiosSingle(`${AUDIENCE_URL_ONE}/${audienceid}`)
      if (!audience) return history.push('/404')

      const { doctors, name, id, query, createdAt, updatedAt, peopleCount } = audience
      addManyDoctors(doctors)
      setCurrentAudience(
        {
          name,
          id,
          query,
          createdat: createdAt,
          updatedat: updatedAt,
          peoplecount: peopleCount,
        },
        AudienceAction.EDIT
      )
    }

    const getAllDoctors = async () => {
      const doctors = await getAxiosArr(DOCTORS_URL)
      if (!doctors) return history.push('/404')

      addManyDoctors(doctors)
      setCurrentAudience(
        { ...INIT_AUDIENCE, peoplecount: `${doctors?.length || 0}` },
        AudienceAction.CREATE_CRM
      )
    }

    const isCrm = location.pathname === PagesData.CREATE_AUDIENCE_CRM.link
    // const isNew = location.pathname === PagesData.CREATE_AUDIENCE.link

    if (isCrm) getAllDoctors()
    else getAudienceDoctors()

    return clearDoctors
  }, [])

  return (
    <>
      <div className={cx(styles.pageContent)}>
        <AudienceHead
          audienceInfo={currentAudience.audience}
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
        title={configFilter.title || ''}
        savedSettings={filterState}
      />
    </>
  )
}

export default OneAudience
