import { useHistory, useLocation, useParams } from 'react-router-dom'

import useParamSelector from 'hooks/useParamSelector'
import { AudienceAction } from 'constants/audience'
import { getAudiencesById } from './selectors'
import { PagesData } from 'constants/url'

const { CREATE_CRM, CREATE_NEW, EDIT } = AudienceAction

const useCurrentAudience = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  const location = useLocation()
  const audience = useParamSelector(getAudiencesById, audienceid)

  const isCrm = location.pathname === PagesData.CREATE_AUDIENCE_CRM.link

  let currentAudience
  if (audience) currentAudience = { audience, action: EDIT }
  else if (isCrm) currentAudience = { audience, action: CREATE_CRM }
  else currentAudience = { audience, action: CREATE_NEW }

  return { currentAudience }
}

export default useCurrentAudience
