import { FC, useRef } from 'react'

import ScrollArea from 'containers/ScrollArea/ScrollArea'
import Table from './Table'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

import styles from './Table.module.scss'
import tableStyles from './TableBase.module.scss'

interface ITable {
  headers: string[]
  handleScrollLimit: () => void
  children: React.ReactNode[] | React.ReactNode
  checkMenu?: React.ReactNode
  simplebarRef?: React.RefObject<SimpleBar>
}

const ScrollTable: FC<ITable> = ({
  children,
  headers,
  handleScrollLimit,
  checkMenu,
  simplebarRef,
}) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(wrapperRef, innerRef, children, handleScrollLimit)

  return (
    <>
      <div className={styles.wrapper}>
        <ScrollArea modificator={styles.scroll} customRef={wrapperRef} simplebarRef={simplebarRef}>
          <div
            style={{
              display: 'block',
              overflowX: 'auto',
            }}
          >
            <Table innerRef={innerRef} headers={headers} checkMenu={checkMenu}>
              {children}
            </Table>
          </div>
        </ScrollArea>
        {checkMenu && <div className={tableStyles.checkMenu}>{checkMenu}</div>}
      </div>
    </>
  )
}

export default ScrollTable
