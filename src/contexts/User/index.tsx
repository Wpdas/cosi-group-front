import React, { createContext, useReducer } from 'react'
import userReducer, { initialState } from './reducer'
import { UserReducerActionTypes, UserState } from './types'

interface ContextProps {
  state: UserState
  dispatch: React.Dispatch<UserReducerActionTypes>
}

export const UserContext = createContext<ContextProps>({
  state: initialState,
  dispatch: (value: UserReducerActionTypes) => null,
})

type Props = {
  children: React.ReactNode
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  )
}
