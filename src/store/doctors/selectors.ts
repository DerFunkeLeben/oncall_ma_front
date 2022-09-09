import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { StoreKeys, IStoreDoctors } from './_data-types'

const getDoctorsObj = (state: IState): IStoreDoctors[StoreKeys.allDoctors] =>
  state?.doctors?.[StoreKeys.allDoctors] || {}

const getDoctorsIds = createSelector(getDoctorsObj, (docs) => Object.keys(docs).reverse())
const getAllDoctors = createSelector(getDoctorsObj, (docs) => Object.values(docs).flat().reverse())
const getDoctorsCount = createSelector(getDoctorsIds, (docs) => docs.length)
const getNewDoctorIndex = createSelector(getDoctorsCount, (length) => length + 1)

export { getDoctorsCount, getDoctorsIds, getNewDoctorIndex, getAllDoctors }
