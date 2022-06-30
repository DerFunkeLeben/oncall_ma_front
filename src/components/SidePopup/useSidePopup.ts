import { useState } from 'react'

const useSidePopup = () => {
  const [step, setStep] = useState(0)

  const goToNextStep = () => {
    setStep(step + 1)
  }

  const goToPrevStep = () => {
    setStep(step - 1)
  }

  return [step, goToNextStep, goToPrevStep]
}

export default useSidePopup
