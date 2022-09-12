import { DoctorKeys } from 'constants/audience'
import {
  Conditions,
  LogicalOperators,
  NegativeLogicalOperators,
  PositiveLogicalOperators,
} from 'constants/sidePopup'

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

export type ILogicalOperator = PositiveLogicalOperators | NegativeLogicalOperators
export interface AudienceSingleQuery {
  field: string
  type: Conditions
  value: string
}

export type AudienceFullQuery = {
  [key in ILogicalOperator]: AudienceSingleQuery[]
}

export type AudienceQuery = {
  [key in ILogicalOperator]: AudienceFullQuery[]
}
