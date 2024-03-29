export const TIME_OPTIONS = [
  { name: 'null', label: 'Выберите' },
  { name: 'months', label: 'Месяцы' },
  { name: 'weeks', label: 'Недели' },
  { name: 'days', label: 'Дни' },
  { name: 'hours', label: 'Часы' },
  { name: 'minutes', label: 'Минуты' },
]

export enum ConditionTypes {
  BY_ATTRIBUTES = 'atribute',
  BY_COMMUNICATION_TYPE = 'byCommunicationType',
  random = 'random',
}

export const CONDIIOTNS_OPTIONS = [
  { name: ConditionTypes.BY_ATTRIBUTES, label: 'По атрибутам' },
  // { name: ConditionTypes.BY_COMMUNICATION_TYPE, label: 'По типу коммуникации' },
  { name: ConditionTypes.random, label: 'Рандомно' },
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
  ATTRIBUTE_CONDITION = 'AttibuteConditionAction',
}

export enum PositiveLogicalOperators {
  AND = 'and',
  OR = 'or',
}
export enum NegativeLogicalOperators {
  NAND = 'notAnd',
  NOR = 'notOr',
}
export const LogicalOperators = {
  ...PositiveLogicalOperators,
  ...NegativeLogicalOperators,
}
export enum Conditions {
  CONTAINS = 'contain',
  NOT_CONTAINS = 'notContain',
  EQUAL = 'equal',
  NOT_EQUAL = 'notEqual',
}

export const LogicLabels = {
  [PositiveLogicalOperators.AND]: 'и',
  [PositiveLogicalOperators.OR]: 'или',
  [NegativeLogicalOperators.NAND]: 'не и',
  [NegativeLogicalOperators.NOR]: 'не или',
}

export const ConditionsLabels = {
  [Conditions.CONTAINS]: 'содержит',
  [Conditions.NOT_CONTAINS]: 'не содержит',
  [Conditions.EQUAL]: 'равно',
  [Conditions.NOT_EQUAL]: 'не равно',
}

export const defaultQueryValue = '!@#$%^&*&&^@&#*$**@#()'
export const defaultQueryToSend = {
  and: {
    and: {
      and: [
        {
          field: 'name',
          type: 'notContain',
          value: defaultQueryValue,
        },
      ],
    },
  },
}
