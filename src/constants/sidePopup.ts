export const TIME_OPTIONS = [
  { name: 'months', label: 'Месяцы' },
  { name: 'weeks', label: 'Недели' },
  { name: 'days', label: 'Дни' },
  { name: 'hours', label: 'Часы' },
  { name: 'minutes', label: 'Минуты' },
]

export const ATTRIBUTES_OPTIONS = [
  { name: 'surname', label: 'Фамилия' },
  { name: 'firstname', label: 'Имя' },
  { name: 'middlename', label: 'Отчество' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Телефон', type: 'tel' },
  { name: 'city', label: 'Город' },
  { name: 'speciality', label: 'Специальность' },
  { name: 'segment', label: 'Сегмент' },
]

export enum SidePopupActions {
  TABLE = 'table',
  FILTER = 'filter',
  TEXTAREA = 'textarea',
  INPUT = 'input',
  SLIDER = 'slider',
  SLIDER_RELATION = 'sliderRelation',
  RADIO = 'radiogroup',
  NUMERIC_STEP = 'numericStep',
  DROP_DOWN = 'dropDown',
  DURATION = 'duration',
  ATTRIBUTES = 'attributes',
  DATE = 'datePick',
  EMAIL = 'email',
}

export enum PositiveLogicalOperators {
  AND = 'и',
  OR = 'или',
}
export enum NegativeLogicalOperators {
  NAND = 'не и',
  NOR = 'не или',
}
export const LogicalOperators = {
  ...PositiveLogicalOperators,
  ...NegativeLogicalOperators,
}
export enum Conditions {
  CONTAINS = 'содержит',
  NOT_CONTAINS = 'не содержит',
  EQUAL = 'равно',
  NOT_EQUAL = 'не равно',
}
