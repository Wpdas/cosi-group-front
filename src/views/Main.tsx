import React, { useContext } from 'react'
import { StepContext } from 'contexts/Step'
import Welcome from './Welcome'
import BasicInformation from './BasicInformation'
import Review from './Review'
import Done from './Done'

const Main: React.FC = () => {
  const { step } = useContext(StepContext)

  switch (step) {
    case 'WELCOME':
      return <Welcome />
    case 'BASIC_INFO':
      return <BasicInformation />
    case 'REVIEW':
      return <Review />
    case 'DONE':
      return <Done />
    default:
      return <Welcome />
  }
}

export default Main
