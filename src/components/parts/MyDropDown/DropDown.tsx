import { FC, useState, useRef } from 'react'

import styles from './DropDown.module.scss'
import Button from 'components/parts/Button/Button'
import useClickOutside from 'hooks/useClickOutside'

interface IDropDown {
  name: string
  config: { name: string; action: () => void }[]
}

const DropDown: FC<IDropDown> = ({ name, config }) => {
  const [isDropdownOpen, setDropdownState] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleToggleDropdown = () => setDropdownState(!isDropdownOpen)

  useClickOutside(isDropdownOpen, rootRef, handleToggleDropdown)

  return (
    <div className={styles.dropdown} ref={rootRef}>
      <Button onClick={handleToggleDropdown}>
        <p>{name}</p>
      </Button>
      <div className={styles.dropContainer}>
        {isDropdownOpen &&
          config.map((element) => (
            <button className={styles.dropElement} key={element.name} onClick={element.action}>
              {element.name}
            </button>
          ))}
      </div>
    </div>
  )
}

export default DropDown
