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
  email = 'email',
  phone = 'phone',
  specialty = 'specialty',
  secondSpecialty = 'secondSpecialty',
  firstName = 'firstName',
  lastName = 'lastName',
  middleName = 'middleName',
  organization = 'organization',
  city = 'city',
  region = 'region',
  district = 'district',
  meta = 'meta',
}

const DoctorKeyLabels = {
  [DoctorKeys.email]: 'Email',
  [DoctorKeys.phone]: 'Телефон',
  [DoctorKeys.specialty]: 'Специальность',
  [DoctorKeys.secondSpecialty]: 'II Специальность',
  [DoctorKeys.firstName]: 'Имя',
  [DoctorKeys.lastName]: 'Фамилия',
  [DoctorKeys.middleName]: 'Отчество',
  [DoctorKeys.organization]: 'Организация',
  [DoctorKeys.city]: 'Город',
  [DoctorKeys.region]: 'Регион',
  [DoctorKeys.district]: 'Округ',
  [DoctorKeys.meta]: 'Метаданные',
}

export { createAudienceOptions, DoctorsAction, DoctorKeys, DoctorKeyLabels }
