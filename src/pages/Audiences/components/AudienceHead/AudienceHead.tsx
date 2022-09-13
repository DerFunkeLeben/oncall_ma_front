import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'

import { IconExport, IconFilters } from 'assets/icons'
import { IAudienceMetaData } from 'types/audience'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import { AUDIENCE_URL_CREATE, DOCTORS_URL_ADD, PagesData } from 'constants/url'
import useDoctors from 'store/doctors/useDoctors'
import { postAxiosSingle } from 'utils/axios'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import useAllFolders from 'store/folders/useAllFolders'
import { MainReducerKeys } from 'store/data-types'

interface IAudienceHead {
  audienceInfo: IAudienceMetaData
  openFilter: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudienceHead: FC<IAudienceHead> = ({ audienceInfo, handleChange, openFilter }) => {
  const { allDoctors, doctorsCount } = useDoctors()
  const { activeFolderName } = useAllFolders(MainReducerKeys.audiences)
  const [contentChanged, setContentChanged] = useState(false)

  const handleSave = async () => {
    // const result = await postAxiosSingle(DOCTORS_URL_ADD, {}, allDoctors)
    const audienceCreateDto = {
      query: audienceInfo.filterQuery,
      name: audienceInfo.name,
      group: activeFolderName,
    }
    console.log(audienceCreateDto)

    const result = await postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
    console.log(result)
  }

  useDidUpdateEffect(() => setContentChanged(true), [doctorsCount, audienceInfo.name])

  return (
    <PageHead
      mod={true}
      title={audienceInfo.name}
      handleTitleChange={handleChange}
      contactCount={`${doctorsCount}` || audienceInfo.peoplecount}
      createDate={audienceInfo.createdat}
      lastUpdateDate={audienceInfo.updatedat}
      buttonBackUrl={PagesData.AUDIENCES.link}
      buttonBackName="К списку аудиторий"
      titleEditable={true}
      buttonBackMessageBox={contentChanged}
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
      <Button onClick={handleSave}>
        <span>Сохранить</span>
      </Button>
    </PageHead>
  )
}

export default memo(AudienceHead)
