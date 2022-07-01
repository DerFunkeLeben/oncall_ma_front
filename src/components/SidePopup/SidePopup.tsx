import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

import { IconPlus } from 'assets/icons'
import TextAreaAction from './actions/TextAreaAction/TextAreaAction'

import { IStep, IState } from 'pages/Audiences/OneAudience/OneAudience'
import ScrollArea from 'containers/ScrollArea/ScrollArea'

interface ISidePopup {
  isOpen: boolean
  close: () => void
  config: IStep
  handleSave: React.Dispatch<React.SetStateAction<IState>>
  title: string
}

const SidePopup: FC<ISidePopup> = ({ isOpen, close, config, handleSave, title }) => {
  const generateInitState = () => {
    const { name } = config
    return {
      [name]: 'a',
    }
    /*TODO обрабатывать вложенности*/
  }
  const initState = generateInitState()
  const [state, setState] = useState<IState>(initState)

  const createConfig = (step: IStep, acc: { [key: string]: string }[] = []): any => {
    const { name, type, getNextStep } = step

    acc = [...acc, { name, type, value: state[name] }]

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
    setState(initState)
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

  const renderSteps = () => {
    // const { steps } = configArray
    const steps = configArray
    return steps.map((step: any, index: number) => {
      if (index + 1 !== currentStep) return
      const { type, name } = step
      switch (type) {
        case 'filter':
          return (
            <div key={name}>
              <p>filter</p>
            </div>
          )
        case 'table':
          return (
            <div key={name}>
              <p>table</p>
            </div>
          )
        case 'textarea':
          return (
            <div key={name}>
              <p>textarea</p>
            </div>
          )
        default:
          return null
      }
    })
  }

  // useEffect(() => {
  //   console.log(state)
  // }, [state])

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
        <div className={styles.popupContent}>{<ScrollArea>{renderSteps()}</ScrollArea>}</div>
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
