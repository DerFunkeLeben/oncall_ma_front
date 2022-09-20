import { FC, useCallback, useEffect, useState } from 'react'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import AllContentTable from './AllContentTable'
import CreateDropDown from '../../../components/CreateDropDown/CreateDropDown'

import useSearch from 'hooks/useSearch'
import { useContentFolders } from 'store/folders/useAllFolders'

import { CONTENT_URL_ALL, CONTENT_URL_FOLDERS } from 'constants/url'
import helpMessages from 'constants/helpMessages'
import { createContentOptions } from 'constants/content'
import { Align } from 'constants/dictionary'
import { MainReducerKeys } from 'store/data-types'
import { IPageData } from 'types'
import { IContent } from 'types/content'
import { getAxiosArr } from 'utils/axios'

import { IconMailBig } from 'assets/icons'
import styles from './AllContent.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'

const AllContent: FC<IPageData> = () => {
  const { initFolders, activeFolderName, mainFolderName } = useContentFolders()
  const [allContent, setAllContent] = useState<any[]>([])
  const [oneFolderContent, setOneFolderContent] = useState<any[]>(allContent)
  const { search, filtered, onChange } = useSearch<IContent>('title', oneFolderContent)

  const totalCountOfData = oneFolderContent.length
  const totalCountOfFilteredData = filtered.length
  const emptyFilterResult = totalCountOfData && !totalCountOfFilteredData

  const getAllContent = useCallback(async () => {
    const content = await getAxiosArr(CONTENT_URL_ALL)
    const folders = await getAxiosArr(CONTENT_URL_FOLDERS)

    // TODO поменять получаемый объект на бэке
    const foldersArr = Object.entries(folders).map(([group, value]) => {
      return { group, count: value.count }
    })

    setAllContent(() => content)
    initFolders(foldersArr)
  }, [initFolders])

  // const deleteAudiences = useCallback(
  //   async (ids: string[]) => {
  //     await postAxiosSingle(AUDIENCE_URL_DELETE, {}, { ids })
  //     await getAllContent()
  //   },
  //   [getAllContent]
  // )

  useEffect(() => {
    if (activeFolderName === mainFolderName) return setOneFolderContent(allContent)

    const filteredContent = allContent.filter((content: any) => content.group === activeFolderName)
    setOneFolderContent(filteredContent)
  }, [activeFolderName, allContent])

  useEffect(() => {
    getAllContent()
  }, [])

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
        <CreateDropDown align={Align.RIGHT} createOptions={createContentOptions} />
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

export default AllContent
