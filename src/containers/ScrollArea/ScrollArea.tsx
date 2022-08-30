import { FC, ReactNode } from 'react'
import SimpleBar from 'simplebar-react'
import cx from 'classnames'

import 'simplebar/dist/simplebar.min.css'
import style from './ScrollArea.module.scss'

interface IScrollArea {
  customRef?: ReactNode
  simplebarRef?: any
  modificator?: string
  autoHide?: boolean
  maxHeight?: string
}

const ScrollArea: FC<IScrollArea> = ({
  children,
  customRef,
  simplebarRef,
  autoHide = true,
  modificator = '',
  maxHeight,
}) => (
  <SimpleBar
    scrollableNodeProps={{ ref: customRef }}
    style={{ maxHeight: maxHeight || '100%' }}
    autoHide={autoHide}
    ref={simplebarRef}
    className={cx(style.scrollArea, { [modificator]: modificator })}
  >
    {children}
  </SimpleBar>
)

export default ScrollArea
