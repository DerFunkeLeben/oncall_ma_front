import { FC, useEffect, useState } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import CreateDropDown from 'components/CreateDropDown/CreateDropDown'
import { AllAudiencesTable } from './parts/AllAudiencesTable'
import { EmptyFilter } from './parts/EmptyTable/EmptyFilter'
import { EmptyTable } from './parts/EmptyTable/EmptyTable'
import PopupOfCreationFromExist from './parts/PopupOfCreationFromExist/PopupOfCreationFromExist'
import { AUDIENCE_URL_ALL, PagesData } from 'constants/url'
import { Align } from 'constants/dictionary'
import { useAudienceFolders } from 'store/folders/useAllFolders'
import useAllAudiences from 'store/audiences/useAllAudiences'
import useToggle from 'hooks/useToggle'
import useSearch from 'hooks/useSearch'
import { ICreateOption, IPageData } from 'types'
import { MainReducerKeys } from 'store/data-types'
import { getAxiosArr } from 'utils/axios'

import { IconUpload } from 'assets/icons'
import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

const menuIsOpen = true

const AllAudiences: FC<IPageData> = () => {
  const { initFolders, activeFolderName, mainFolderName } = useAudienceFolders()
  const { allAudiences, initAllAudiences } = useAllAudiences()
  const [oneFolderAudiences, setOneFolderAudiences] = useState<any[]>(allAudiences)
  const { search, filtered, onChange } = useSearch('name', oneFolderAudiences)
  const [popupCreateFromExistIsOpen, togglePopupCreateFromExist] = useToggle()

  const createAudienceOptions: ICreateOption[] = [
    { title: 'Из CRM', url: PagesData.CREATE_AUDIENCE_CRM.link },
    { title: 'Из готовой аудитории', action: togglePopupCreateFromExist },
    { title: 'Новая', url: PagesData.CREATE_AUDIENCE.link },
  ]

  const totalCountOfData = oneFolderAudiences.length
  const totalCountOfFilteredData = filtered.length
  const emptyFilterResult = totalCountOfData && !totalCountOfFilteredData

  useEffect(() => {
    if (activeFolderName === mainFolderName) return setOneFolderAudiences(allAudiences)

    const filteredAudiences = allAudiences.filter(
      (audience: any) => audience.group === activeFolderName
    )
    setOneFolderAudiences(filteredAudiences)
  }, [activeFolderName, allAudiences])

  useEffect(() => {
    const getAllAudiences = async () => {
      const data = await getAxiosArr(AUDIENCE_URL_ALL)

      initAllAudiences(data)
      initFolders(data)
    }

    getAllAudiences()
  }, [])

  return (
    <>
      <div className={cx(styles.pageContent, { [styles.menuIsOpen]: menuIsOpen })}>
        <PageHead
          title="Аудитории"
          separateBlock={
            <InputBase
              placeholder="Поиск по названию"
              icon={true}
              value={search}
              handleInputChange={onChange}
            />
          }
        >
          <Button modificator={buttonStyles.theme_secondary}>
            <IconUpload />
            <span>Загрузить аудиторию</span>
          </Button>
          <CreateDropDown
            align={Align.RIGHT}
            createOptions={createAudienceOptions}
            btnTitle={'Создать аудиторию'}
          />
        </PageHead>
        <Folders reducerName={MainReducerKeys.audiences} />
        <div className={styles.tableWrapper}>
          {totalCountOfFilteredData ? <AllAudiencesTable allAudiencesData={filtered} /> : null}
          {!totalCountOfData ? <EmptyTable createOptions={createAudienceOptions} /> : null}
          {emptyFilterResult ? <EmptyFilter /> : null}
        </div>
      </div>
      <PopupOfCreationFromExist
        close={togglePopupCreateFromExist}
        isOpen={popupCreateFromExistIsOpen}
        allAudiences={allAudiences}
      />
    </>
  )
}
export default AllAudiences
