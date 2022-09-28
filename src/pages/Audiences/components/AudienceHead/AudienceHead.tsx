import { ChangeEvent, FC, memo, useState } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'

import { IconExport, IconFilters } from 'assets/icons'
import { IAudienceMetaData } from 'types/audience'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import pageHeadStyle from 'components/PageHead/PageHead.module.scss'
import { PagesData } from 'constants/url'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import { useDeepCompareEffect } from 'hooks/useDeepCompareEffect'

interface IAudienceHead {
  audienceInfo: IAudienceMetaData
  openFilter: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
  isLoaded: boolean
}

const AudienceHead: FC<IAudienceHead> = ({
  audienceInfo,
  handleChange,
  openFilter,
  handleSave,
  isLoaded,
}) => {
  const [contentChanged, setContentChanged] = useState(false)

  useDeepCompareEffect(() => {
    if (!contentChanged && isLoaded) setContentChanged(true)
  }, [audienceInfo])

  return (
    <PageHead
      mod={pageHeadStyle.bigHeadMode}
      title={audienceInfo.name}
      handleTitleChange={handleChange}
      contactCount={audienceInfo.peoplecount}
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
