import { IAudienceMetaData } from 'types/audience'
import { Conditions } from './sidePopup'

enum DoctorKeys {
  specialty = 'specialty',
  secondSpecialty = 'secondSpecialty',
  organization = 'organization',
  city = 'city',
  region = 'region',
  district = 'district',
  email = 'email',
  phone = 'phone',
  firstName = 'firstName',
  lastName = 'lastName',
  middleName = 'middleName',
  meta = 'meta',
}

const DoctorKeyLabels = {
  [DoctorKeys.specialty]: 'Специальность',
  [DoctorKeys.secondSpecialty]: '2-ая специальность',
  [DoctorKeys.organization]: 'Организация',
  [DoctorKeys.city]: 'Город',
  [DoctorKeys.region]: 'Регион',
  [DoctorKeys.district]: 'Округ',
  [DoctorKeys.email]: 'Email',
  [DoctorKeys.phone]: 'Телефон',
  [DoctorKeys.firstName]: 'Имя',
  [DoctorKeys.lastName]: 'Фамилия',
  [DoctorKeys.middleName]: 'Отчество',
  [DoctorKeys.meta]: 'Метаданные',
}

enum DoctorsAction {
  EDIT = 'edit',
  DELETE = 'delete',
}

enum AudienceAction {
  EDIT = 'edit',
  CREATE_CRM = 'create_crm',
  CREATE_NEW = 'create_new',
}

const INIT_AUDIENCE: IAudienceMetaData = {
  id: '0',
  name: 'Аудитория',
  peoplecount: '0',
  createdat: '',
  updatedat: '',
  query: {},
}

export { DoctorsAction, DoctorKeys, DoctorKeyLabels, AudienceAction, INIT_AUDIENCE }
