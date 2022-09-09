import { IDoctor } from 'types/audience'

export enum StoreKeys {
  allDoctors = 'allDoctors',
  newDoctorIndex = 'newDoctorIndex',
}

export interface IStoreDoctors {
  [StoreKeys.allDoctors]: { [key: string]: IDoctor }
  [StoreKeys.newDoctorIndex]: string
}
