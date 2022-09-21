import { FC, useEffect, useState, SyntheticEvent } from 'react'
import cx from 'classnames'

import styles from './SourceTask.module.scss'
import PopupWithTable from './parts/PopupWithTable/PopupWithTable'
import useAllAudiences from 'store/audiences/useAllAudiences'
import { useScenario } from 'store/scenario/useScenario'
import { ITask } from 'types'
import { getAxiosArr } from 'utils/axios'
import { AUDIENCE_URL_ALL } from 'constants/url'

interface ISourceTask {
  style: { [key: string]: any }
  properties: ITask
  id?: string
}

const drawLine = () => {
  const length = 300
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={length}
      height="88"
      viewBox={`0 0 ${length} 88`}
      className={styles.line}
    >
      <g id="icon">
        <path
          id="path"
          data-name="path"
          d={`M 0 44 L ${length} 44`}
          fill="none"
          strokeWidth="2"
          stroke="#8D87AC"
        />
      </g>
    </svg>
  )
}

const SourceTask: FC<ISourceTask> = ({ style, id, properties }) => {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [settings, setSettings] = useState<{ name: string; peoplecount: string } | undefined>(
    undefined
  )
  const { allAudiences, initAllAudiences } = useAllAudiences()
  const { updateSettings } = useScenario()

  const closePopup = () => {
    console.log('closePopup')
    setPopupIsOpen(false)
  }

  const openPopup = () => {
    console.log('openPopup')
    setPopupIsOpen(true)
  }

  const setAudience = (audienceId: string) => {
    if (!id) return
    const newSettings = {
      audience: audienceId,
    }
    updateSettings(id, newSettings)
  }

  const getSettings = () => {
    if (!properties.properties) return
    if (!allAudiences) return
    const { audience } = properties.properties
    const choosenAudience = allAudiences.filter((aud) => aud.id === audience)[0]
    if (!choosenAudience) return
    const { name, peoplecount } = choosenAudience
    return { name, peoplecount }
  }

  useEffect(() => {
    const getAllAudiences = async () => {
      const data = await getAxiosArr(AUDIENCE_URL_ALL)

      initAllAudiences(data)
    }
    getAllAudiences()
  }, [])

  useEffect(() => {
    const newSettings = getSettings()
    setSettings(newSettings)
  }, [properties])

  return (
    <div className={styles.source} style={style}>
      {drawLine()}
      <div className={styles.sourceTask} onClick={openPopup}>
        <div className={styles.innerBlock}>
          {settings ? (
            <>
              <div>
                <p className={cx('text_1', styles.audienceName)}>{properties.name}</p>
                <p className={cx('text_05', styles.audienceCount)}>
                  {settings.peoplecount} контактов
                </p>
              </div>
              <div>
                <p className={cx('text_1', styles.title)}>Изменить</p>
              </div>
            </>
          ) : (
            <p className={cx(styles.title, 'text_05')}>
              Настройте <br /> список аудитории
            </p>
          )}
        </div>
      </div>
      <PopupWithTable
        close={closePopup}
        isOpen={popupIsOpen}
        allAudiences={allAudiences}
        submitAction={setAudience}
      />
    </div>
  )
}

export default SourceTask
