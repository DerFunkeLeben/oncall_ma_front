const { useMemo } = require("react")
const { useState } = require("react")

const config = (listItems) => {
    return {
        steps: [
            {type: 'table', title: 'telegram', name: 'text', value: textArea||'', items: listItems},
            {type: 'radio', title: 'rfrjasfsdf', name: 'select-me'}
        ],
        validation: (values) => {
            const errors = {}
            if(!values.text) return {['text']: 'Пустое поле'} 

            return errors
        }
    }
}

const PopupContainer = (config, handleSubmit) => {
    const initConfig = useMemo(() => {
        const getedconfig = config()
        return {
            0: {
                text: '',
                selectMe: ''
            },
            1: {
                text: '',
                selectMe: ''
            },
        }
    })
    const [state, setState] = useState(initConfig)
    const [step, setStep] = useState(0)

    const changeStep = () => {
        const validate = config[step]
        const isValid = validate(state[step])
        if(isValid && !limitSte)
         setState(step+1)
        }
    }

    return <PopupWrapper changeStep={changeStep}>
        {config.map(step) => {
            if(step = 1)
            if(text)return <Text handleChange={setState}></Text>
        }}
    </PopupWrapper>

}