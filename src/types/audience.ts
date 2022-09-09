export interface IAudienceMetaData {
  id: string
  name: string
  contact_count: string
  create_date: string
  last_update_date: string
}

export interface IDoctor {
  email?: string
  phone?: string
  specialty?: string
  secondSpecialty?: string
  firstName?: string
  lastName?: string
  middleName?: string
  organization?: string
  city?: string
  region?: string
  district?: string
  meta?: string
}

export interface IDoctorEditInfo {
  id: string
  field: string
  value: string
}
