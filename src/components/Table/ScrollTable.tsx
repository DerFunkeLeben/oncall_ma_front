import { FC, useRef, useState, useContext, useEffect } from 'react'
import cx from 'classnames'

import ScrollArea from 'containers/ScrollArea/ScrollArea'
import Table from './Table'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import screenSizeContext from 'context/screenSizeContext'

import styles from './Table.module.scss'
import tableStyles from './TableBase.module.scss'
import { IconArrow } from 'assets/icons'

interface ITable {
  headers: string[]
  handleScrollLimit: () => void
  children: React.ReactNode[] | React.ReactNode
  checkMenu?: React.ReactNode
}

const stepWidth = 2

const ScrollTable: FC<ITable> = ({ children, headers, handleScrollLimit, checkMenu }) => {
  const innerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const simplebarRef = useRef<SimpleBar>(null)
  const [tableIsFit, setTableIsFit] = useState(true)
  const windowSize: string = useContext(screenSizeContext)

  const scrollNode = simplebarRef.current
  const scrollElement = scrollNode?.getScrollElement()
  let intervalName: NodeJS.Timeout

  const oneStep = (step: number) => {
    if (!scrollElement) return
    const { scrollLeft } = scrollElement
    scrollElement.scrollTo({ left: scrollLeft + step })
  }

  const scrollTo = (step: number) => {
    stopMove()
    intervalName = setInterval(() => oneStep(step), 1)
  }

  const scrollToRight = () => {
    scrollTo(stepWidth)
  }

  const scrollToLeft = () => {
    scrollTo(-stepWidth)
  }

  //TODO обьеденить scrollToRight scrollToLeft

  const stopMove = () => {
    console.log('STOP')
    clearInterval(intervalName)
  }

  useInfiniteScroll(wrapperRef, innerRef, children, handleScrollLimit)

  useEffect(() => {
    if (!scrollElement) return
    const { scrollWidth, clientWidth } = scrollElement
    const isTableFit = scrollWidth === clientWidth
    console.log(scrollWidth, clientWidth)
    setTableIsFit(isTableFit)
  }, [windowSize, scrollElement])

  return (
    <div className={styles.wrapper}>
      <ScrollArea modificator={styles.scroll} customRef={wrapperRef} simplebarRef={simplebarRef}>
        <Table innerRef={innerRef} headers={headers} checkMenu={checkMenu}>
          {children}
        </Table>
      </ScrollArea>
      {!tableIsFit && (
        <>
          <button
            className={cx(styles.hoverZone, styles.hoverZoneLeft)}
            onMouseEnter={scrollToLeft}
            onMouseLeave={stopMove}
          >
            <IconArrow />
          </button>
          <button
            className={cx(styles.hoverZone, styles.hoverZoneRight)}
            onMouseEnter={scrollToRight}
            onMouseLeave={stopMove}
          >
            <IconArrow />
          </button>
        </>
      )}
      {checkMenu && <div className={tableStyles.checkMenu}>{checkMenu}</div>}
    </div>
  )
}

export default ScrollTable
