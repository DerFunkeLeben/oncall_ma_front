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
import { useAudienceFolders } from 'store/folders/useAllFolders'
import {
  AUDIENCE_URL_CREATE,
  AUDIENCE_URL_TEST,
  AUDIENCE_URL_VALID_NAME,
  DOCTORS_URL_ADD,
  PagesData,
} from 'constants/url'
import { AudienceAction, INIT_AUDIENCE } from 'constants/audience'
import { defaultQueryToSend } from 'constants/sidePopup'
import { IFilterState } from 'components/SidePopup/actions/FilterAction/types'
import { IPageData } from 'types'
import { getAxiosSingle, postAxiosSingle } from 'utils/axios'
import {
  parseStateToQuery,
  parseQueryToState,
} from '../../../components/SidePopup/actions/FilterAction/utils'

import styles from './OneAudience.module.scss'
import ValidationError from 'constants/ValidationError'
import useMessageBoxContext from 'context/MessageBoxContext'
import { timeDelay } from 'utils'
import { getAllDoctors, getAudienceDoctors } from 'utils/axiosQueries/audiences'
import { configFilter } from './filterConfig'

const OneAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  const history = useHistory()
  const location = useLocation()

  const { currentAudience, setCurrentAudience, updateAudienceInfo } = useCurrentAudience()
  const { allDoctors, clearDoctors, addManyDoctors, setAllDoctors } = useDoctors()
  const { activeFolderName } = useAudienceFolders()
  const { setMessageBox } = useMessageBoxContext()

  const [filterisOpen, toggleFilterPopup] = useToggle()
  const [filterState, setFilterState] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  const isCrm = location.pathname === PagesData.CREATE_AUDIENCE_CRM.link
  const isNew = location.pathname === PagesData.CREATE_AUDIENCE.link
  const isExist = location.pathname.includes('create_exist')

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateAudienceInfo({
      ...currentAudience.audience,
      name: event.target.value,
    })
  }

  const handleFiltersSave = async (tempSettings: { filter: IFilterState }) => {
    const query = parseStateToQuery(tempSettings.filter)
    const response = await postAxiosSingle(AUDIENCE_URL_TEST, {}, { query })

    setAllDoctors(response.data)
    updateAudienceInfo({
      ...currentAudience.audience,
      query,
      peoplecount: response.data.length,
    })
  }

  const handleSave = async () => {
    const nameIsTaken = await getAxiosSingle(
      `${AUDIENCE_URL_VALID_NAME}/${currentAudience.audience.name}`
    )
    if (nameIsTaken && !isNew) {
      return setMessageBox({
        isOpen: true,
        title: ValidationError.AUDIENCE_ALREADY_EXISTS,
        buttons: ['Ок'],
      })
    }

    let queryToSend = currentAudience.audience.query
    const filterQueryIsEmpty = Object.keys(currentAudience.audience.query).length === 0
    if (filterQueryIsEmpty) {
      queryToSend = defaultQueryToSend
    }

    const promiseArr = []

    const audienceCreateDto = {
      query: queryToSend,
      name: currentAudience.audience.name,
      group: activeFolderName,
    }

    if (isCrm || isNew || isExist) {
      const audienceCreatePromise = postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
      promiseArr.push(audienceCreatePromise)
    }
    if (isNew) {
      const docsAddPromise = postAxiosSingle(DOCTORS_URL_ADD, {}, allDoctors)
      promiseArr.push(docsAddPromise)
    }

    await Promise.all(promiseArr)
    await timeDelay(350) // TODO не подгружается новая аудитория в список всех, если без задержки
    history.push(PagesData.AUDIENCES.link)
  }

  useEffect(() => {
    if (!filterisOpen) return
    const query = currentAudience.audience.query
    const state = parseQueryToState(query)
    setFilterState(state)
  }, [filterisOpen])

  useEffect(() => {
    // TODO какая то ерунда, надо переписать
    let loadPromise
    if (isNew) {
      setCurrentAudience(INIT_AUDIENCE, AudienceAction.CREATE_NEW)
      setIsLoaded(true)
    } else if (isCrm) {
      loadPromise = getAllDoctors(setCurrentAudience, addManyDoctors)
    } else if (isExist) {
      loadPromise = getAudienceDoctors(audienceid, setCurrentAudience, addManyDoctors, 'copy')
    } else {
      loadPromise = getAudienceDoctors(audienceid, setCurrentAudience, addManyDoctors)
    }

    loadPromise?.then(() => setIsLoaded(true))

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
          isLoaded={isLoaded}
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
