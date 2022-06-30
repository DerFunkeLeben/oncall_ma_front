import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

import { IconPlus } from 'assets/icons'
import TextAreaAction from './actions/TextAreaAction/TextAreaAction'

import { IAction, IConfig, IState } from './types'

interface ISidePopup {
  isOpen: boolean
  close: () => void
}

const title = 'Фильтры'

const config: IConfig = {
  title: 'Telegram',
  steps: [
    [
      {
        type: 'table',
        url: '/telegrammMessages',
        name: 'telegrammMessageId',
        require: true,
      },
    ],
    [
      {
        type: 'textarea',
        name: 'telegrammMessageText',
        require: true,
      },
    ],
  ],
}

const SidePopup: FC<ISidePopup> = ({ isOpen, close }) => {
  const generateInitState = () => {
    return config.steps.reduce((stepsAccumulator, step, index) => {
      const asd = step.reduce((actionsAccumulator, action) => {
        const { name } = action
        return { ...actionsAccumulator, [name]: '' }
      }, {})
      return { ...stepsAccumulator, [index]: asd }
    }, {})
  }

  const initState = generateInitState()

  const [currentStep, setCurrentStep] = useState(1)
  const [state, setState] = useState<IState>(initState)

  const countOfSteps = config.steps.length
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
    setCurrentStep(1)
    closePopup()
  }

  const renderAction = (action: IAction) => {
    const { type, name } = action
    // const props = { action, state, setState }
    switch (type) {
      case 'table':
        return <div key={name}>table</div>
      case 'textarea':
        return (
          <TextAreaAction
            currentStep={currentStep}
            action={action}
            currentState={state}
            setState={setState}
          />
        )
      default:
        return null
    }
  }

  const renderSteps = () => {
    const { steps } = config
    return steps.map((step, index) => {
      if (index + 1 !== currentStep) return
      return step.map((action) => {
        return renderAction(action)
      })
    })
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  if (!isOpen) return null
  return createPortal(
    <div className={styles.popupWrapper}>
      <div className={styles.popupBackground} onClick={closePopup} />
      <div className={styles.popupContent}>
        <div className={styles.header}>
          <Button modificator={buttonThemes.theme_secondary} onClick={closePopup}>
            <IconPlus className={styles.iconCross} />
          </Button>
          <h2 className={cx(styles.title, 'header_2')}>{title}</h2>
        </div>
        {renderSteps()}
        <div className={styles.footer}>
          {!itsOnlyStep && <div>{`Шаг ${currentStep} из ${countOfSteps}`}</div>}
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
    </div>,
    document.body
  )
}

export default SidePopup
