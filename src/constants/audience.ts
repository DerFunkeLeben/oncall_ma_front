import { ICreateOption } from 'types'

import { PagesData } from 'constants/url'

const createAudienceOptions: ICreateOption[] = [
  { title: 'Из CRM', url: PagesData.CONTENT_HTML.link },
  { title: 'Из готовой аудитории', url: PagesData.CONTENT_SMS.link },
  { title: 'Новая', url: PagesData.CONTENT_FILE.link },
]

enum DoctorsAction {
  EDIT = 'edit',
  DELETE = 'delete',
}

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

enum AudienceAction {
  EDIT = 'edit',
  CREATE_CRM = 'create_crm',
  CREATE_NEW = 'create_new',
}

export { createAudienceOptions, DoctorsAction, DoctorKeys, DoctorKeyLabels, AudienceAction }
