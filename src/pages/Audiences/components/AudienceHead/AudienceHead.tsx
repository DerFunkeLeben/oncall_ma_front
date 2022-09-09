import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'

import { IconExport, IconFilters } from 'assets/icons'
import { IAudienceMetaData } from 'types/audience'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import { DOCTORS_URL_ADD, PagesData } from 'constants/url'
import useDoctors from 'store/doctors/useDoctors'
import { postAxiosSingle } from 'utils/axios'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'

interface IAudienceHead {
  audienceInfo: IAudienceMetaData
  openFilter: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const AudienceHead: FC<IAudienceHead> = ({ audienceInfo, handleChange, openFilter }) => {
  const { allDoctors, doctorsCount } = useDoctors()
  const [contentChanged, setContentChanged] = useState(false)

  const handleSave = async () => {
    await postAxiosSingle(DOCTORS_URL_ADD, {}, allDoctors)
  }

  useDidUpdateEffect(() => setContentChanged(true), [doctorsCount, audienceInfo.name])

  return (
    <PageHead
      mod={true}
      title={audienceInfo.name}
      handleTitleChange={handleChange}
      contactCount={`${doctorsCount}` || audienceInfo.contact_count}
      createDate={audienceInfo.create_date}
      lastUpdateDate={audienceInfo.last_update_date}
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
