import { DoctorKeys } from 'constants/audience'

export interface IAudienceMetaData {
  id: string
  name: string
  contact_count: string
  create_date: string
  last_update_date: string
}

export interface IDoctor {
  [DoctorKeys.email]?: string
  [DoctorKeys.phone]?: string
  [DoctorKeys.specialty]?: string
  [DoctorKeys.secondSpecialty]?: string
  [DoctorKeys.firstName]?: string
  [DoctorKeys.lastName]?: string
  [DoctorKeys.middleName]?: string
  [DoctorKeys.organization]?: string
  [DoctorKeys.city]?: string
  [DoctorKeys.region]?: string
  [DoctorKeys.district]?: string
  [DoctorKeys.meta]?: string
}

export interface IDoctorEditInfo {
  id: string
  field: string
  value: string
}
