import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

import ActionCreator from './actions'
import { getStep, getTempSettings } from './selectors'

const useSidePopup = () => {
  const dispatch = useDispatch()

  const tempSettings = useSelector(getTempSettings) as { [key: string]: any }
  const stepNumber = useSelector(getStep)

  const setTempSettings = (value: any) => {
    dispatch(ActionCreator.setTempSettings({ ...value }))
  }

  const updateTempSettings = (isReset: any, update: any) => {
    const result = update.reduce((acc: any, el: any) => {
      return { ...acc, ...el }
    }, {})
    const newTempSettings = isReset
      ? {
          ...result,
        }
      : {
          ...tempSettings,
          ...result,
        }
    console.log({ newTempSettings }, ...update)
    dispatch(ActionCreator.setTempSettings({ ...newTempSettings }))
  }
  const resetTempSettings = () => {
    dispatch(ActionCreator.setTempSettings({}))
  }
  const incrementStep = () => {
    dispatch(ActionCreator.setStep(stepNumber + 1))
  }
  const decrementStep = () => {
    dispatch(ActionCreator.setStep(stepNumber - 1))
  }
  const resetStep = () => {
    dispatch(ActionCreator.setStep(1))
  }

  return {
    tempSettings,
    setTempSettings,
    updateTempSettings,
    resetTempSettings,
    incrementStep,
    decrementStep,
    resetStep,
    stepNumber,
  }
}

export { useSidePopup }
