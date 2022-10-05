import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import { PopupContext } from 'context/SidePopupContext'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import SidePopupContent from './SidePopupContent'

import { IconPlus } from 'assets/icons'

import { IStep, IStatePopup } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
import SidePopupFooter from './SidePopupFooter'

interface ISidePopup {
  isOpen: boolean
  close: () => void
  config: IStep
  handleSave: any
  title: string
  savedSettings?: any
  type?: any
  validationState?: [boolean, Dispatch<SetStateAction<boolean>>]
}

const SidePopup: FC<ISidePopup> = ({
  isOpen,
  close,
  config,
  handleSave,
  title,
  savedSettings,
  validationState,
}) => {
  const {
    incrementStep,
    decrementStep,
    resetStep,
    stepNumber,
    tempSettings,
    setTempSettings,
    resetTempSettings,
    updateTempSettings,
  } = useSidePopup()

  const createConfig = (stepConfig: IStep, acc: any[] = []): any => {
    if (!tempSettings) return
    const { name, getNextStep } = stepConfig

    acc = [...acc, { ...stepConfig }]

    if (getNextStep) {
      const nextStep = getNextStep(tempSettings, updateTempSettings)
      if (nextStep) {
        const children = createConfig(nextStep, acc)
        return [...children]
      }
    }

    return acc
  }

  // const [configArray, setConfigArray] = useState([])
  // setConfigArray(createConfig(config))
  const configArray = createConfig(config)

  useEffect(() => {
    setTempSettings(savedSettings)
    // setConfigArray(createConfig(config))
  }, [isOpen, savedSettings])

  const step = configArray[stepNumber - 1]

  const countOfSteps = configArray.length

  const closePopup = () => {
    resetTempSettings()
    resetStep()
    close()
  }

  const goToNextStep = () => {
    console.log('validate!')
    incrementStep()
  }

  const goToPrevStep = () => {
    decrementStep()
  }

  const save = async () => {
    console.log('save')
    const isNotValid = await handleSave(tempSettings)
    if (isNotValid) return
    resetStep()
    closePopup()
  }

  if (!isOpen) return null

  return createPortal(
    <div className={styles.popupWrapper}>
      <div className={styles.popupBackground} onClick={closePopup} />
      <div className={styles.popupContentainer}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <Button modificator={buttonThemes.theme_secondary} onClick={closePopup}>
              <IconPlus className={styles.iconCross} />
            </Button>
            <h2 className={cx(styles.title, 'header_2')}>{title}</h2>
          </div>
        </div>
        <div className={styles.popupContent}>
          <PopupContext.Provider
            value={{ step, tempSettings, setTempSettings, savedSettings, validationState }}
          >
            <SidePopupContent />
          </PopupContext.Provider>
        </div>
        <SidePopupFooter
          stepNumber={stepNumber}
          countOfSteps={countOfSteps}
          closePopup={closePopup}
          goToPrevStep={goToPrevStep}
          save={save}
          goToNextStep={goToNextStep}
          counterEnabled={true}
        />
      </div>
    </div>,
    document.body
  )
}

export default SidePopup
