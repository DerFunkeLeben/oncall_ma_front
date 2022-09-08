import { FC, useEffect, useState, Dispatch } from 'react'
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

interface ISidePopup {
  isOpen: boolean
  close: () => void
  config: IStep
  handleSave: any
  title: string
  savedSettings?: any
}

const SidePopup: FC<ISidePopup> = ({ isOpen, close, config, handleSave, title, savedSettings }) => {
  const [tempSettings, setTempSettings] = useState<IStatePopup>({})
  const [currentStep, setCurrentStep] = useState(1)

  const currentSettings = savedSettings ? savedSettings : tempSettings

  const createConfig = (step: IStep, acc: any[] = []): any => {
    const { name, getNextStep } = step

    acc = [...acc, { ...step, value: tempSettings[name] }]

    if (getNextStep) {
      const nextStep = getNextStep(currentSettings)
      const children = createConfig(nextStep, acc)
      return [...children]
    }

    return acc
  }

  const configArray = createConfig(config)

  const action = configArray[currentStep - 1]

  const countOfSteps = configArray.length
  const itsLastStep = currentStep === countOfSteps
  const itsFirstStep = currentStep === 1
  const itsOnlyStep = countOfSteps === 1

  const closePopup = () => {
    setTempSettings({})
    setCurrentStep(1)
    close()
  }

  const goToNextStep = () => {
    console.log('validate!')
    setCurrentStep(currentStep + 1)
  }

  const goToPrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const save = () => {
    console.log('save')
    handleSave(tempSettings)
    setCurrentStep(1)
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
          <PopupContext.Provider value={{ action, currentSettings, setTempSettings }}>
            <SidePopupContent />
          </PopupContext.Provider>
        </div>
        <div className={styles.footer}>
          <div className={styles.footerStepCounter}>
            {!itsOnlyStep && (
              <div className="text_1">{`Шаг ${currentStep} из ${countOfSteps}`}</div>
            )}
          </div>
          <div className={styles.footerButtons}>
            {itsFirstStep ? (
              <Button onClick={closePopup} modificator={buttonThemes.theme_secondary}>
                Отменить
              </Button>
            ) : (
              <Button onClick={goToPrevStep} modificator={buttonThemes.theme_secondary}>
                Назад
              </Button>
            )}
            {itsLastStep ? (
              <Button onClick={save}>Сохранить</Button>
            ) : (
              <Button onClick={goToNextStep}>Далее</Button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SidePopup
