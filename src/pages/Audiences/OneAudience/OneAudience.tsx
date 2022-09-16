import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import cx from 'classnames'

import SidePopup from 'components/SidePopup/SidePopup'
import AudienceHead from '../components/AudienceHead/AudienceHead'
import { OneAudienceTable } from '../components/AudienceTable/OneAudienceTable'
import { CreateAudienceTable } from '../components/AudienceTable/CreateAudienceTable'

import useToggle from 'hooks/useToggle'
import useDoctors from 'store/doctors/useDoctors'
import useCurrentAudience from 'store/audiences/useCurrentAudience'
import { useMessageBox } from 'hooks/useMessageBox'
import { useAudienceFolders } from 'store/folders/useAllFolders'
import {
  AUDIENCE_URL_CREATE,
  AUDIENCE_URL_ONE,
  AUDIENCE_URL_VALID_NAME,
  DOCTORS_URL,
  DOCTORS_URL_ADD,
  PagesData,
} from 'constants/url'
import { AudienceAction, DoctorKeys, INIT_AUDIENCE } from 'constants/audience'
import { SidePopupActions } from 'constants/sidePopup'
import { IFilterState } from 'components/SidePopup/actions/FilterAction/types'
import { IPageData } from 'types'
import { IStep } from 'types/sidePopup'
import { getAxiosArr, getAxiosSingle, postAxiosSingle } from 'utils/axios'
import {
  parseStateToQuery,
  parseQueryToState,
} from '../../../components/SidePopup/actions/FilterAction/utils'

import styles from './OneAudience.module.scss'
import ValidationError from 'constants/ValidationError'

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
  const { setMessageBox } = useMessageBox()

  const [filterisOpen, toggleFilterPopup] = useToggle()
  const [filterState, setFilterState] = useState({})

  const isCrm = location.pathname === PagesData.CREATE_AUDIENCE_CRM.link
  const isNew = location.pathname === PagesData.CREATE_AUDIENCE.link

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
    const promiseArr = []

    const audienceCreateDto = {
      query: currentAudience.audience.query,
      name: currentAudience.audience.name,
      group: activeFolderName,
    }

    const isValidName = await getAxiosSingle(AUDIENCE_URL_VALID_NAME)
    if (!isValidName) {
      return setMessageBox({
        isOpen: true,
        title: ValidationError.AUDIENCE_ALREADY_EXISTS,
        buttons: ['Ок'],
      })
    }

    const audienceCreatePromise = postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
    promiseArr.push(audienceCreatePromise)

    if (isNew) {
      const docsAddPromise = postAxiosSingle(DOCTORS_URL_ADD, {}, allDoctors)
      promiseArr.push(docsAddPromise)
    }

    await Promise.all(promiseArr)
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

    if (isNew) setCurrentAudience(INIT_AUDIENCE, AudienceAction.CREATE_NEW)
    else if (isCrm) getAllDoctors()
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
        {isNew ? <CreateAudienceTable /> : <OneAudienceTable allDoctors={allDoctors} />}
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
