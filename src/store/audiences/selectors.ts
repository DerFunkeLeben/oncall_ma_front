import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { StoreKeys, IStoreAudiences } from './_data-types'

const getAudiences = (state: IState): IStoreAudiences[StoreKeys.allAudiences] =>
  state.audiences.data[StoreKeys.allAudiences]

const getCurrentAudience = (state: IState): IStoreAudiences[StoreKeys.currentAudience] =>
  state.audiences.data[StoreKeys.currentAudience]

const getAllAudiences = createSelector(getAudiences, (aud) => Object.values(aud).flat())

const getTitle = (_: any, title: string) => title
const getTitleMatch = createSelector(getAllAudiences, getTitle, (audiences, titleToCheck) =>
  audiences.find(({ name }) => name === titleToCheck)
)

const getId = (_: any, id: string) => id
const getAudiencesById = createSelector(getAudiences, getId, (audiences, id) => audiences[id])

export { getAudiences, getCurrentAudience, getAllAudiences, getTitleMatch, getAudiencesById }
