import { DoctorKeys } from 'constants/audience'
import { SidePopupActions } from 'constants/sidePopup'
import { IStep } from 'types/sidePopup'

const { FILTER } = SidePopupActions

export const configFilter: IStep = {
  name: FILTER,
  title: 'Фильтры',
  actions: [
    {
      label: 'ATTRIBUTE_CONDITION',
      type: FILTER,
      settingName: FILTER,
      attributes: Object.keys(DoctorKeys),
      applySettings: (newState, properties, updateTempSettings) => {
        const settedFilters = properties?.[FILTER]
        const update = settedFilters
          ? {
              ...settedFilters,
              ...newState,
            }
          : newState
        updateTempSettings(false, [{ filter: update }])
      },
    },
  ],
}
