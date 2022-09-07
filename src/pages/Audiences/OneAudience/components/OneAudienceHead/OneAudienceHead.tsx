import { FC } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'

import { IconExport, IconFilters } from 'assets/icons'
import { IAudienceMetaData } from 'types/audience'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

interface IOneAudienceHead {
  audienceInfo: IAudienceMetaData
  openFilter: () => void
}

export const OneAudienceHead: FC<IOneAudienceHead> = ({ audienceInfo, openFilter }) => {
  return (
    <PageHead
      mod={true}
      title={audienceInfo.name}
      contactCount={audienceInfo.contact_count}
      createDate={audienceInfo.create_date}
      lastUpdateDate={audienceInfo.last_update_date}
      buttonBackName="К списку аудиторий"
      buttonBackUrl="/audences"
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

      <Button>
        <span>Сохранить</span>
      </Button>
    </PageHead>
  )
}
