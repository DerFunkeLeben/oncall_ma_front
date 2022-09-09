import { FC } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import CreateDropDown from 'components/CreateDropDown/CreateDropDown'
import { AllAudiencesTable } from './AllAudiencesTable'
import { PagesData } from 'constants/url'
import helpMessages from 'constants/helpMessages'
import PopupOfCreationFromExist from './PopupOfCreationFromExist/PopupOfCreationFromExist'
import useToggle from 'hooks/useToggle'
import useSearch from 'hooks/useSearch'

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

import { ICreateOption, IPageData } from 'types'
import { MainReducerKeys } from 'store/data-types'
import { IconAudiences, IconUpload } from 'assets/icons'

import { data } from './audiencesData'

const menuIsOpen = true

const AllAudiences: FC<IPageData> = () => {
  const { search, filtered, onChange } = useSearch('name', data)

  const [popupCreateFromExistIsOpen, togglePopupCreateFromExist] = useToggle()

  const createAudienceOptions: ICreateOption[] = [
    { title: 'Из CRM', url: '' },
    { title: 'Из готовой аудитории', action: togglePopupCreateFromExist },
    { title: 'Новая', url: PagesData.CREATE_AUDIENCE.link },
  ]

  const totalCountOfData = data.length
  const totalCountOfFilteredData = filtered.length
  const emptyFilterResult = totalCountOfData && !totalCountOfFilteredData

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
            alignRight
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
      />
    </>
  )
}
function EmptyTable({ createOptions }: { createOptions: ICreateOption[] }) {
  return (
    <div className={styles.emptyTableWrapper}>
      <IconAudiences />
      <div
        className={styles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_AUDIENCES_TABLE }}
      />
      <CreateDropDown
        mode={cx(buttonStyles.theme_additional, styles.buttonCreate)}
        createOptions={createOptions}
        btnTitle={'Создать аудиторию'}
      />
    </div>
  )
}

function EmptyFilter() {
  return (
    <div className={styles.emptyTableWrapper}>
      <IconAudiences />
      <div
        className={styles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_FILTER_RESULT }}
      />
    </div>
  )
}

export default AllAudiences
