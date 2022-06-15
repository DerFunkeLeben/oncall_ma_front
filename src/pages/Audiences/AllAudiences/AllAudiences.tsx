import { FC } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import styles from './AllAudiences.module.scss'
import { IPageData } from 'types'
import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import buttonStyles from '../../../components/parts/Button/ButtonThemes.module.scss'
import DropDown from 'components/parts/DropDown/DropDown'

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const goToSubPage = (name: string) => () => history.push(`${url}/${name}`)

  const data = [
    { name: 'Из CRM', action: goToSubPage('fakeID') },
    { name: 'Из готовой аудитории', action: () => console.log('Попап из готовой') },
    { name: 'Новая', action: goToSubPage('create_new') },
  ]

  return (
    <div className={styles.pageContent}>
      <PageHead title="Аудитории" subtitle="Вы можете создать или редактировать аудиторию">
        <Button modificator={buttonStyles.theme_secondary}>
          <p>Загрузить аудиторию</p>
        </Button>
        <DropDown name="Создать аудиторию" data={data} />
      </PageHead>
    </div>
  )
}

export default AllAudiences
