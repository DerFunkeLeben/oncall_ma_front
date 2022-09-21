import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AudienceAction } from 'constants/audience'
import { getCurrentAudience } from './selectors'
import ActionCreator from './actions'
import { IAudienceMetaData } from 'types/audience'

const useCurrentAudience = () => {
  const dispatch = useDispatch()
  const currentAudience = useSelector(getCurrentAudience)

  const setCurrentAudience = useCallback(
    (audience: IAudienceMetaData, action: AudienceAction) => {
      dispatch(ActionCreator.setCurrentAudience({ audience, action }))
    },
    [dispatch]
  )

  const updateAudienceInfo = useCallback(
    (newAudience: IAudienceMetaData) => {
      dispatch(ActionCreator.updateAudienceInfo(newAudience))
    },
    [dispatch]
  )

  return { currentAudience, setCurrentAudience, updateAudienceInfo }
}

export default useCurrentAudience
