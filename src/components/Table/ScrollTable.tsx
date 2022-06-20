import { FC, useRef } from 'react'

import ScrollArea from 'containers/ScrollArea/ScrollArea'
import Table from './Table'
import useInfiniteScroll from 'hooks/useInfiniteScroll'

import styles from './Table.module.scss'

interface ITable {
  headers: string[]
  handleScrollLimit: () => void
  children: React.ReactNode[] | React.ReactNode
}

const ScrollTable: FC<ITable> = ({ children, headers, handleScrollLimit }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useInfiniteScroll(wrapperRef, innerRef, children, handleScrollLimit)

  return (
    <div className={styles.wrapper}>
      <ScrollArea modificator={styles.scroll} customRef={wrapperRef}>
        <Table innerRef={innerRef} headers={headers}>
          {children}
        </Table>
      </ScrollArea>
    </div>
  )
}

export default ScrollTable
