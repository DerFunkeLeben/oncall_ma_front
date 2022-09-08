import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuid } from 'uuid'

import ActionCreator from './actions'
import { getTempSettings } from './selectors'

const useSidePopup = () => {
  const dispatch = useDispatch()

  const tempSettings = useSelector(getTempSettings)

  const setTempSettings = (value: any) => {
    dispatch(ActionCreator.setTempSettings({ value }))
  }

  return {
    tempSettings,
    setTempSettings,
  }
}

export { useSidePopup }
