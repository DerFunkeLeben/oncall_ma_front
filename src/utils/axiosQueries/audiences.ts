import { SetStateAction, Dispatch } from 'react'
import { getAxiosArr, getAxiosSingle, postAxiosSingle } from 'utils/axios'
import {
  AUDIENCE_URL_ALL,
  AUDIENCE_URL_FOLDERS,
  AUDIENCE_URL_DELETE,
  AUDIENCE_URL_ONE,
  AUDIENCE_URL_CREATE,
  DOCTORS_URL,
} from 'constants/url'
import { AudienceAction, INIT_AUDIENCE } from 'constants/audience'
import { IAudienceMetaData, IDoctor } from 'types/audience'

const getAxiosAudiences = async (
  setAllAudiences: Dispatch<SetStateAction<any>>,
  initFolders: (folders: any[]) => void
) => {
  const audiences = await getAxiosArr(AUDIENCE_URL_ALL)
  const folders = await getAxiosArr(AUDIENCE_URL_FOLDERS)

  console.log(audiences)
  setAllAudiences(audiences)
  initFolders(folders)
}

const deleteAudiences = async (ids: string[]) => {
  await postAxiosSingle(AUDIENCE_URL_DELETE, {}, { ids })
}

const copyAudiences = async (ids: string[]) => {
  const promisesGet = ids.map((id) => getAxiosSingle(`${AUDIENCE_URL_ONE}/${id}`))
  const audiences = await Promise.all(promisesGet)

  const promisesPost = audiences.map((audience) => {
    const { name, query, group } = audience
    console.log(name, query, group)
    const audienceCreateDto = {
      group,
      query: JSON.parse(query),
      name: name + ' copy',
    }
    return postAxiosSingle(AUDIENCE_URL_CREATE, {}, audienceCreateDto)
  })
  await Promise.all(promisesPost)
}

const getAudienceDoctors = async (
  audienceid: string | undefined,
  setCurrentAudience: (audience: IAudienceMetaData, action: AudienceAction) => void,
  addManyDoctors: (doctors: IDoctor[] | undefined) => Promise<void>,
  nameSuffix = ''
) => {
  const audience = await getAxiosSingle(`${AUDIENCE_URL_ONE}/${audienceid}`)

  const { doctors, name, id, query, createdAt, updatedAt, peopleCount } = audience
  addManyDoctors(doctors)
  setCurrentAudience(
    {
      name: `${name} ${nameSuffix}`,
      id,
      query: JSON.parse(query || '{}'),
      createdat: createdAt,
      updatedat: updatedAt,
      peoplecount: peopleCount,
    },
    AudienceAction.EDIT
  )
}

const getAllDoctors = async (
  setCurrentAudience: (audience: IAudienceMetaData, action: AudienceAction) => void,
  addManyDoctors: (doctors: IDoctor[] | undefined) => Promise<void>
) => {
  const doctors = await getAxiosArr(DOCTORS_URL)

  addManyDoctors(doctors)
  setCurrentAudience(
    { ...INIT_AUDIENCE, peoplecount: `${doctors?.length || 0}` },
    AudienceAction.CREATE_CRM
  )
}

export { getAxiosAudiences, deleteAudiences, copyAudiences, getAudienceDoctors, getAllDoctors }
