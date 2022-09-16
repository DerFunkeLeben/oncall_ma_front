import { FC, useEffect, useState, Dispatch } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import styles from './SidePopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface ISidePopupFooter {
  stepNumber?: any
  countOfSteps?: any
  closePopup: any
  goToPrevStep: any
  save: any
  goToNextStep: any
  counterEnabled: boolean
}

const SidePopupFooter: FC<ISidePopupFooter> = ({
  stepNumber,
  countOfSteps,
  closePopup,
  goToPrevStep,
  save,
  goToNextStep,
  counterEnabled,
}) => {
  const itsLastStep = stepNumber === countOfSteps
  const itsFirstStep = stepNumber === 1
  const itsOnlyStep = countOfSteps === 1
  return (
    <div className={styles.footer}>
      <div className={styles.footerStepCounter}>
        {counterEnabled && !itsOnlyStep && (
          <div className="text_1">{`Шаг ${stepNumber} из ${countOfSteps}`}</div>
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
  )
}

export default SidePopupFooter
