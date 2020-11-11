import React, { createContext, useState } from 'react'

type StepType = 'WELCOME' | 'BASIC_INFO' | 'REVIEW' | 'DONE'

interface Step {
  step: StepType
  setStep: React.Dispatch<React.SetStateAction<StepType>>
}

const defaultValue: Step = {
  step: 'WELCOME',
  setStep: () => {
    throw new Error('setStep must be initialized')
  },
}

export const StepContext = createContext(defaultValue)

export const StepProvider: React.FC = ({ children }) => {
  const [step, setStep] = useState<StepType>('WELCOME')

  return (
    <StepContext.Provider value={{ step, setStep }}>
      {children}
    </StepContext.Provider>
  )
}
