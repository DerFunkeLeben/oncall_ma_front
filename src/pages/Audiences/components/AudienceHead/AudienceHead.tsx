import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'

import { IconExport, IconFilters } from 'assets/icons'
import { IAudienceMetaData } from 'types/audience'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import { PagesData } from 'constants/url'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import { useHistory } from 'react-router-dom'

interface IAudienceHead {
  audienceInfo: IAudienceMetaData
  openFilter: () => void
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
}

const AudienceHead: FC<IAudienceHead> = ({
  audienceInfo,
  handleChange,
  openFilter,
  handleSave,
}) => {
  const [contentChanged, setContentChanged] = useState(false)
  const history = useHistory()

  const save = () => {
    handleSave()
    history.push(PagesData.AUDIENCES.link)
  }

  useDidUpdateEffect(() => {
    setContentChanged(true)
  }, [audienceInfo.name, audienceInfo.query])

  return (
    <PageHead
      mod={true}
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
      <Button onClick={save}>
        <span>Сохранить</span>
      </Button>
    </PageHead>
  )
}

export default memo(AudienceHead)
