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
    { name: 'Из CRM', action: goToSubPage('1') },
    { name: 'Из готовой аудитории', action: goToSubPage('2') },
    { name: 'Новая', action: goToSubPage('3') },
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
