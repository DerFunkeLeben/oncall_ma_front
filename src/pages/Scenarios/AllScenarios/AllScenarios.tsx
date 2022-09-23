import { FC, useState, useEffect } from 'react'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import AllContentTable from './AllScenariosTable'
import AllScenariosTable from './AllScenariosTable'
import CreateDropDown from '../../../components/CreateDropDown/CreateDropDown'

import useAllContent from 'store/content/useAllContent'
import useSearch from 'hooks/useSearch'

import helpMessages from 'constants/helpMessages'
import { createContentOptions } from 'constants/content'
import { Align } from 'constants/dictionary'
import { MainReducerKeys } from 'store/data-types'
import { IPageData } from 'types'
import { IContent } from 'types/content'
import { IAllScenaries, TScenarioObj } from 'types'
import Button from 'components/parts/Button/Button'
import { CREATE_SCENARIO } from 'constants/url'

import { IconMailBig } from 'assets/icons'
import styles from './AllScenarios.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import { useScenario } from 'store/scenario/useScenario'

const AllScenarios: FC<IPageData> = () => {
  const history = useHistory()
  const { initAllScenaries } = useScenario()
  const [allContent, setAllContent] = useState<IAllScenaries>([])

  useEffect(() => {
    initAllScenaries().then((result) => setAllContent(result))
  }, [])

  const goToCreatePage = () => {
    history.push(`${CREATE_SCENARIO}`)
  }

  const { search, filtered, onChange } = useSearch<TScenarioObj>('start', allContent)

  const totalCountOfData = allContent.length
  const totalCountOfFilteredData = filtered.length
  const emptyFilterResult = totalCountOfData && !totalCountOfFilteredData

  return (
    <div className={cx(styles.pageContent, { [styles.menuIsOpen]: true })}>
      <PageHead
        title="Сценарии"
        separateBlock={
          <InputBase
            placeholder="Поиск по названию"
            icon={true}
            value={search}
            handleInputChange={onChange}
          />
        }
      >
        <Button onClick={goToCreatePage}>Создать</Button>
      </PageHead>
      <Folders reducerName={MainReducerKeys.content} />
      <div className={styles.tableWrapper}>
        {totalCountOfFilteredData ? <AllScenariosTable allContent={filtered} /> : null}
        {!totalCountOfData ? <EmptyTable /> : null}
        {emptyFilterResult ? <EmptyFilter /> : null}
      </div>
    </div>
  )
}
function EmptyTable() {
  return (
    <div className={tableStyles.emptyTableWrapper}>
      <IconMailBig />
      <div
        className={tableStyles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_CONTENT_TABLE }}
      />
      <CreateDropDown
        mode={cx(buttonStyles.theme_additional, styles.buttonCreate)}
        align={Align.TOP_CENTER}
        createOptions={createContentOptions}
      />
    </div>
  )
}

function EmptyFilter() {
  return (
    <div className={tableStyles.emptyTableWrapper}>
      <IconMailBig />
      <div
        className={tableStyles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_FILTER_RESULT }}
      />
    </div>
  )
}

export default AllScenarios
