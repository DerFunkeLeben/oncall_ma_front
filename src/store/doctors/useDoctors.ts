import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { batchActions } from 'redux-batched-actions'
import { IDoctor, IDoctorEditInfo } from 'types/audience'
import ActionCreator from './actions'

import { getAllDoctors, getDoctorsCount, getDoctorsIds } from './selectors'

const useDoctors = () => {
  const allDoctors = useSelector(getAllDoctors)
  const doctorsCount = useSelector(getDoctorsCount)
  const doctorsIds = useSelector(getDoctorsIds)

  const dispatch = useDispatch()

  const setAllDoctors = useCallback(
    async (doctors: IDoctor[] | undefined) => {
      dispatch(batchActions([ActionCreator.clearDoctors(), ActionCreator.addManyDoctors(doctors)]))
    },
    [dispatch]
  )

  const addManyDoctors = useCallback(
    async (doctors: IDoctor[] | undefined) => {
      dispatch(ActionCreator.addManyDoctors(doctors))
    },
    [dispatch]
  )

  const addDoctor = useCallback(() => {
    dispatch(ActionCreator.addDoctor())
  }, [dispatch])

  const clearDoctors = useCallback(() => {
    dispatch(ActionCreator.clearDoctors())
  }, [dispatch])

  const editDoctor = useCallback(
    (docInfo: IDoctorEditInfo) => {
      dispatch(ActionCreator.editDoctor(docInfo))
    },
    [dispatch]
  )

  const deleteDoctor = useCallback(
    (doctorId: string) => {
      dispatch(ActionCreator.deleteDoctor(doctorId))
    },
    [dispatch]
  )

  const deleteMultipleDoctors = useCallback(
    (doctorIds: string[]) => {
      dispatch(ActionCreator.deleteMultipleDoctors(doctorIds))
    },
    [dispatch]
  )

  const copyMultipleDoctors = useCallback(
    (doctorIds: string[]) => {
      dispatch(ActionCreator.copyMultipleDoctors(doctorIds))
    },
    [dispatch]
  )

  return {
    allDoctors,
    addDoctor,
    clearDoctors,
    doctorsCount,
    doctorsIds,
    editDoctor,
    deleteDoctor,
    deleteMultipleDoctors,
    copyMultipleDoctors,
    addManyDoctors,
    setAllDoctors,
  }
}

export default useDoctors
