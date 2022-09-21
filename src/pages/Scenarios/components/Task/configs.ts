import { SidePopupActions } from 'constants/sidePopup'
import { ISidePopupStep } from 'types/sidePopup'
import { TasksTypes } from 'types'

import { TIME_OPTIONS, CONDIIOTNS_OPTIONS, ConditionTypes } from 'constants/sidePopup'

type IConfigs = {
  [key in TasksTypes]?: ISidePopupStep
}

const configs: IConfigs = {
  wait: {
    name: 'duration',
    title: 'Выбор даты',
    actions: [
      {
        settingName: 'amount',
        label: 'Количество',
        type: SidePopupActions.NUMERIC_STEP,
        applySettings: (newState: any, tempSettings: any, updateTempSettings: any) => {
          updateTempSettings(false, [{ amount: newState }])
        },
      },
      {
        settingName: 'unit',
        label: 'Временной отрезок',
        options: TIME_OPTIONS,
        type: SidePopupActions.DROP_DOWN,
        applySettings: (newState: any, tempSettings: any, updateTempSettings: any) => {
          updateTempSettings(false, [{ unit: newState }])
        },
      },
    ],
  },
  email: {
    name: 'email',
    title: 'Email',
    actions: [
      {
        settingName: 'id',
        label: 'Временной отрезок',
        type: SidePopupActions.TABLE,
        url: 'urlToEmails',
        applySettings: (allLineData: any, tempSettings: any, updateTempSettings: any) => {
          updateTempSettings(false, [allLineData])
        },
      },
    ],
    getNextStep: () => {
      return {
        name: 'email',
        actions: [
          {
            type: SidePopupActions.INPUT,
            settingName: 'theme',
            label: 'emailTitle',
            applySettings: (newState: any, tempSettings: any, updateTempSettings: any) => {
              updateTempSettings(false, [{ theme: newState }])
            },
          },
          {
            type: SidePopupActions.INPUT,
            settingName: 'preheader',
            label: 'emailSubTitle',
            applySettings: (newState: any, tempSettings: any, updateTempSettings: any) => {
              updateTempSettings(false, [{ preheader: newState }])
            },
          },
        ],
      }
    },
  },
  // sms: {
  //   name: 'sms',
  //   title: 'SMS',
  //   actions: [
  //     {
  //       type: SidePopupActions.TABLE,
  //       url: 'urlToSMSes',
  //       settingName: 'smsId',
  //       applySettings: (newState, tempSettings, updateTempSettings) => {
  //         const gettedSMSText = 'text'
  //         updateTempSettings('sms', [{ smsId: newState }, { smsText: gettedSMSText }])
  //       },
  //     },
  //   ],
  //   getNextStep: () => {
  //     return {
  //       name: 'sms',
  //       actions: [
  //         {
  //           label: 'Текст',
  //           type: SidePopupActions.TEXTAREA,
  //           settingName: 'smsText',
  //           applySettings: (newState, tempSettings, updateTempSettings) => {
  //             updateTempSettings('sms', [{ smsText: newState }])
  //           },
  //         },
  //       ],
  //     }
  //   },
  // },
  // telegram: {
  //   name: 'telegram',
  //   title: 'Telegram',
  //   actions: [
  //     {
  //       type: SidePopupActions.TABLE,
  //       url: 'urlToTelegrames',
  //       settingName: 'tgId',
  //       applySettings: (newState, tempSettings, updateTempSettings) => {
  //         const gettedTelegramText = 'text'
  //         updateTempSettings('telegram', [{ tgId: newState }, { tgText: gettedTelegramText }])
  //       },
  //     },
  //   ],
  //   getNextStep: () => {
  //     return {
  //       name: 'telegram',
  //       actions: [
  //         {
  //           label: 'Текст',
  //           type: SidePopupActions.TEXTAREA,
  //           settingName: 'tgText',
  //           applySettings: (newState, tempSettings, updateTempSettings) => {
  //             updateTempSettings('telegram', [{ tgText: newState }])
  //           },
  //         },
  //       ],
  //     }
  //   },
  // },
  // crm_message: {
  //   name: 'crm_message',
  //   title: 'CRM сообщение',
  //   actions: [
  //     {
  //       label: 'Сообщение',
  //       type: SidePopupActions.TEXTAREA,
  //       settingName: 'crm_messageText',
  //       applySettings: (newState, tempSettings, updateTempSettings) => {
  //         updateTempSettings('crm_message', [{ crm_messageText: newState }])
  //       },
  //     },
  //   ],
  // },
  condition: {
    name: 'condition',
    title: 'CRM сообщение',
    actions: [
      {
        label: 'Сообщение',
        type: SidePopupActions.RADIO,
        settingName: 'conditionType',
        options: CONDIIOTNS_OPTIONS,
        applySettings: (newState, tempSettings, updateTempSettings) => {
          const reset = tempSettings.conditionType !== newState
          updateTempSettings(reset, [{ conditionType: newState }])
        },
      },
    ],
    getNextStep: (tempSettings) => {
      const type = tempSettings?.conditionType
      if (!type) return null
      if (type === ConditionTypes.BY_ATTRIBUTES) {
        return {
          name: 'condition',
          actions: [
            {
              label: 'ATTRIBUTE_CONDITION',
              type: SidePopupActions.ATTRIBUTE_CONDITION,
              settingName: 'filter',
              applySettings: (newState, properties, updateTempSettings) => {
                const settedFilters = properties?.['filter']
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
      }
      if (type === ConditionTypes.random) {
        return {
          name: 'condition',
          actions: [
            {
              label: 'Текст111',
              type: SidePopupActions.SLIDER_RELATION,
              settingName: 'slider',
              applySettings: (valuePair, properties, updateTempSettings) => {
                const { index, value } = valuePair
                const anotherIndex = index === 0 ? 1 : 0
                const anotherValue = 100 - value

                updateTempSettings(false, [
                  { [`slider_${index}`]: value.toString() },
                  { [`slider_${anotherIndex}`]: anotherValue.toString() },
                ])
              },
            },
          ],
        }
      }
    },
  },
}

export default configs
