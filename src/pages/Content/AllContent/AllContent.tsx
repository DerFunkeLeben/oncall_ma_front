import { FC, memo } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import AllContentTable from './AllContentTable'
import CreateDropDown from '../../../components/CreateDropDown/CreateDropDown'

import useAllContent from 'store/content/useAllContent'
import useSearch from 'hooks/useSearch'

import helpMessages from 'constants/helpMessages'
import { createContentOptions } from 'constants/content'
import { MainReducerKeys } from 'store/data-types'
import { IPageData } from 'types'
import { IContent } from 'types/content'

import { IconMailBig } from 'assets/icons'
import styles from './AllContent.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'

const AllContent: FC<IPageData> = () => {
  const { allContent } = useAllContent()
  const { search, filtered, onChange } = useSearch<IContent>('title', allContent)

  const totalCountOfData = allContent.length
  const totalCountOfFilteredData = filtered.length
  const emptyFilterResult = totalCountOfData && !totalCountOfFilteredData

  return (
    <div className={cx(styles.pageContent, { [styles.menuIsOpen]: true })}>
      <PageHead
        title="Контент"
        separateBlock={
          <InputBase
            placeholder="Поиск по названию"
            icon={true}
            value={search}
            handleInputChange={onChange}
          />
        }
      >
        <CreateDropDown alignRight createOptions={createContentOptions} />
      </PageHead>
      <Folders reducerName={MainReducerKeys.content} />
      <div className={styles.tableWrapper}>
        {totalCountOfFilteredData ? <AllContentTable allContent={filtered} /> : null}
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

export default AllContent
