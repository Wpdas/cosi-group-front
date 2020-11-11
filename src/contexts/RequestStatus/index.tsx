import React, { createContext, useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/core'

type StatusType = 'loading' | 'ready' | 'error'

interface Status {
  requestStatus: StatusType
  setRequestStatus: React.Dispatch<React.SetStateAction<StatusType>>
}

const defaultValue: Status = {
  requestStatus: 'ready',
  setRequestStatus: () => {
    throw new Error('setStatus must be initialized')
  },
}

export const RequestStatusContext = createContext(defaultValue)

export const RequestStatusProvider: React.FC = ({ children }) => {
  const [requestStatus, setRequestStatus] = useState<StatusType>('ready')
  const toast = useToast()

  useEffect(() => {
    if (requestStatus === 'error') {
      toast({
        title: 'Something went wrong.',
        description:
          'Something went wrong with the request. Please, try again!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [requestStatus, toast])

  return (
    <RequestStatusContext.Provider value={{ requestStatus, setRequestStatus }}>
      {children}
    </RequestStatusContext.Provider>
  )
}
