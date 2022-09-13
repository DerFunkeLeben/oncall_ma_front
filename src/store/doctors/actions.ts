import { IDoctor, IDoctorEditInfo } from 'types/audience'
import ActionType from './action-type'

const ActionCreator = {
  fetchDoctors: (doctors: IDoctor[]) => ({
    type: ActionType.ADD_MANY_DOCTORS,
    payload: doctors,
  }),
  addDoctor: () => ({
    type: ActionType.ADD_DOCTOR,
  }),
  editDoctor: (doctorInfo: IDoctorEditInfo) => ({
    type: ActionType.EDIT_DOCTOR_FIELD,
    payload: doctorInfo,
  }),
  clearDoctors: () => ({
    type: ActionType.CLEAR_DOCTORS,
  }),
  deleteDoctor: (doctorId: string) => ({
    type: ActionType.DELETE_DOCTOR,
    payload: doctorId,
  }),
  deleteMultipleDoctors: (doctorIds: string[]) => ({
    type: ActionType.DELETE_MULTIPLE_DOCTORS,
    payload: doctorIds,
  }),
  copyMultipleDoctors: (doctorIds: string[]) => ({
    type: ActionType.COPY_MULTIPLE_DOCTORS,
    payload: doctorIds,
  }),
}

export default ActionCreator
