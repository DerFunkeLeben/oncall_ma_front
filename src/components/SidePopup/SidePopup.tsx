import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import SidePopupContent from './SidePopupContent'

import { IconPlus } from 'assets/icons'

import { IStep, IState } from 'types/sidePopup'
import ScrollArea from 'containers/ScrollArea/ScrollArea'

interface ISidePopup {
  isOpen: boolean
  close: () => void
  config: IStep
  handleSave: React.Dispatch<React.SetStateAction<IState>>
  title: string
}

const SidePopup: FC<ISidePopup> = ({ isOpen, close, config, handleSave, title }) => {
  const [state, setState] = useState<IState>({})

  const createConfig = (step: IStep, acc: any[] = []): any => {
    const { name, getNextStep } = step

    acc = [...acc, { ...step, value: state[name] }]

    if (getNextStep) {
      const nextStep = getNextStep(state)
      const children = createConfig(nextStep, acc)
      return [...children]
    }

    return acc
  }

  const configArray = createConfig(config)

  const [currentStep, setCurrentStep] = useState(1)

  const countOfSteps = configArray.length
  const itsLastStep = currentStep === countOfSteps
  const itsFirstStep = currentStep === 1
  const itsOnlyStep = countOfSteps === 1

  const closePopup = () => {
    setState({})
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
    handleSave(state)
    setCurrentStep(1)
    closePopup()
  }

  useEffect(() => {
    console.log(state)
  }, [state])

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
          <ScrollArea>
            <div className={styles.popupContentInnerWrapper}>
              <SidePopupContent {...{ configArray, currentStep, state, setState }} />
            </div>
          </ScrollArea>
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
