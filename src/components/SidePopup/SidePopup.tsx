import { FC, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

import { IconPlus } from 'assets/icons'
import TextAreaAction from './actions/TextAreaAction/TextAreaAction'

import { IConfig, IState } from 'types/sidePopup'
import ScrollArea from 'containers/ScrollArea/ScrollArea'

interface ISidePopup {
  isOpen: boolean
  close: () => void
  config: IConfig
  handleSave: React.Dispatch<React.SetStateAction<IState>>
}

// const config: IConfig = {
//   title: 'Фильтры',
//   steps: [
//     [
//       {
//         type: 'table',
//         url: '/telegrammMessages',
//         name: 'telegrammMessageId',
//         require: true,
//       },
//     ],
//     [
//       {
//         type: 'textarea',
//         name: 'telegrammMessageText',
//         require: true,
//       },
//     ],
//     [
//       {
//         type: 'filter',
//         url: '/audences/2144',
//         name: 'audienceFilter',
//         require: true,
//       },
//     ],
//   ],
// }

const SidePopup: FC<ISidePopup> = ({ isOpen, close, config, handleSave }) => {
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
  const { title } = config
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
    const { steps } = config
    return steps.map((step, index) => {
      if (index + 1 !== currentStep) return
      return step.map((action) => {
        const { type, name } = action
        switch (type) {
          case 'filter':
            return (
              <div key={name}>
                <p>table</p>
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
              <TextAreaAction
                key={name}
                currentStep={currentStep}
                action={action}
                currentState={state}
                setState={setState}
              />
            )
          default:
            return null
        }
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
          <ScrollArea>{renderSteps()}</ScrollArea>
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
