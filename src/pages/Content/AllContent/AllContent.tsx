import { FC } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import AllContentTable from './AllContentTable'
import CreateDropDown from './CreateDropDown'

import useAllContent from 'store/content/useAllContent'
import { MainReducerKeys } from 'store/data-types'

import { IPageData } from 'types'

import { IconMailBig } from 'assets/icons'
import styles from './AllContent.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

const EmptyTable: FC = () => {
  return (
    <div className={styles.emptyTableWrapper}>
      <IconMailBig />
      <div className={styles.emptyCaption}>Вы еще не создали ни одного письма</div>
      <CreateDropDown mode={cx(buttonStyles.theme_additional, styles.buttonCreate)} />
    </div>
  )
}
const AllContent: FC<IPageData> = () => {
  const { allContent } = useAllContent()
  const totalCountOfData = allContent.length

  return (
    <div className={cx(styles.pageContent, { [styles.menuIsOpen]: true })}>
      <PageHead
        title="Контент"
        separateBlock={
          <InputBase
            placeholder="Поиск по названию"
            icon={true}
            handleInputChange={() => console.log('asd')}
          />
        }
      >
        <CreateDropDown alignRight />
      </PageHead>
      <Folders reducerName={MainReducerKeys.content} />
      <div className={styles.tableWrapper}>
        {totalCountOfData > 0 ? <AllContentTable /> : <EmptyTable />}
      </div>
    </div>
  )
}

export default AllContent
