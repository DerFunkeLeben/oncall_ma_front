import { IReducer } from 'store/data-types'
import { IDoctor } from 'types/audience'
import ActionType from './action-type'
import { IStoreDoctors, StoreKeys } from './_data-types'

const initialDoctorState: IStoreDoctors = {
  allDoctors: {},
  newDoctorIndex: '0',
  // editableDoctor: {},
}

const initOneDoctor: IDoctor = {
  email: '',
  phone: '',
  specialty: '',
  secondSpecialty: '',
  firstName: '',
  lastName: '',
  middleName: '',
  organization: '',
  city: '',
  region: '',
  district: '',
  meta: '',
}

const reducer = (state = initialDoctorState, { type, payload }: IReducer): IStoreDoctors => {
  switch (type) {
    case ActionType.ADD_DOCTOR: {
      const newIndex = state.newDoctorIndex

      return {
        ...state,
        [StoreKeys.newDoctorIndex]: `${1 + Number(newIndex)}`,
        [StoreKeys.allDoctors]: { ...state.allDoctors, [newIndex]: initOneDoctor },
      }
    }

    case ActionType.CLEAR_DOCTORS: {
      return {
        ...state,
        [StoreKeys.newDoctorIndex]: `0`,
        [StoreKeys.allDoctors]: {},
      }
    }

    case ActionType.EDIT_DOCTOR_FIELD: {
      const { id, field, value } = payload

      return {
        ...state,
        [StoreKeys.allDoctors]: {
          ...state.allDoctors,
          [id]: {
            ...state.allDoctors[id],
            [field]: value,
          },
        },
      }
    }

    case ActionType.DELETE_DOCTOR: {
      const { [payload]: _, ...otherDoctors } = state.allDoctors
      return {
        ...state,
        [StoreKeys.allDoctors]: otherDoctors,
      }
    }

    case ActionType.COPY_MULTIPLE_DOCTORS: {
      const newIndexStart = Number(state.newDoctorIndex)
      const newDoctorsCount = payload.length

      const newDoctors = { ...state.allDoctors }
      payload.map((id: string, index: number) => {
        const existingDoctor = state.allDoctors[id]
        newDoctors[newIndexStart + index] = existingDoctor
      })

      return {
        ...state,
        [StoreKeys.newDoctorIndex]: `${newDoctorsCount + newIndexStart}`,
        [StoreKeys.allDoctors]: newDoctors,
      }
    }

    case ActionType.DELETE_MULTIPLE_DOCTORS: {
      const allDoctorsKeys = Object.keys(state.allDoctors)

      const filteredDoctors = allDoctorsKeys.reduce((acc, key) => {
        const doctor = state.allDoctors[key]
        if (payload.includes(key)) return acc
        return { ...acc, [key]: doctor }
      }, {})

      return {
        ...state,
        [StoreKeys.allDoctors]: filteredDoctors,
      }
    }

    default:
      return state
  }
}

export { reducer, initialDoctorState }
