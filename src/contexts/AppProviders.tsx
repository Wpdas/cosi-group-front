import React from 'react'
import { RequestStatusProvider } from './RequestStatus'
import { StepProvider } from './Step'
import { UserProvider } from './User'

const AppProviders: React.FC = ({ children }) => {
  return (
    <RequestStatusProvider>
      <StepProvider>
        <UserProvider>{children}</UserProvider>
      </StepProvider>
    </RequestStatusProvider>
  )
}

export default AppProviders
