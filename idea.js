// const { useMemo } = require("react")
// const { useState } = require("react")

// const config = (listItems) => {
//     return {
//         steps: [
//             {type: 'table', title: 'telegram', name: 'text', value: textArea||'', items: listItems},
//             {type: 'radio', title: 'rfrjasfsdf', name: 'select-me'}
//         ],
//         validation: (values) => {
//             const errors = {}
//             if(!values.text) return {['text']: 'Пустое поле'}

//             return errors
//         }
//     }
// }

// const PopupContainer = (config, handleSubmit) => {
//     const initConfig = useMemo(() => {
//         const getedconfig = config()
//         return {
//             0: {
//                 text: '',
//                 selectMe: ''
//             },
//             1: {
//                 text: '',
//                 selectMe: ''
//             },
//         }
//     })
//     const [state, setState] = useState(initConfig)
//     const [step, setStep] = useState(0)

//     const changeStep = () => {
//         const validate = config[step]
//         const isValid = validate(state[step])
//         if(isValid && !limitSte)
//          setState(step+1)
//         }
//     }

//     return <PopupWrapper changeStep={changeStep}>
//         {config.map(step) => {
//             if(step = 1)
//             if(text)return <Text handleChange={setState}></Text>
//         }}
//     </PopupWrapper>

// }

// const config = (state) =>{
//     const specialValue = state.telegrammMessageText

//     const state = {
//       filter:
//       telegrammMessageText
//     }

//     return {
//       branches: [],
//       gather: (finalState) => {

//       }

//     }

//     return{
//     {
//         title: 'Ветка',
//         type:'radio',
//         children: {
//         'первый': [
//             {
//             title: 'Фильтры',
//             name: 'filter',
//             steps: [
//                 [
//                 {
//                     type: 'textarea',
//                     name: 'telegrammMessageText',
//                     require: true,
//                 },
//                 ],
//             ],
//             }
//         ]
//         }
//     } }}

const state = {
  currentStep: 0,
  stepname1: '',
  stepname2: '',
  stepname3: '',
}

const initConfig = {
  stepName: 'stepname1',
  type: 'table',
  selectBranch: (state) => {
    if (state.stepname1) return 'branch1'
  },
  stepChilds: {
    branch1: {
      stepName: 'stepname2',
      type: 'check',
    },
    branch2: {
      stepName: 'stepname3',
      type: 'radio',
      selectBranch: (state) => {
        if (state.stepname2) return 'branchN'
      },
      stepChilds: ['...'],
    },
  },
}

const config = f(initConfig, state)
