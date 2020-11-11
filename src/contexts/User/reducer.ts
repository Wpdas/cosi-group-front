import {
  SetUserInformationPayload,
  SetUserNamePayload,
  SET_USER_INFORMATION,
  SET_USER_NAME,
  UserReducer,
  UserState,
} from './types'

export const initialState: UserState = {
  flightNumber: 0,
  firstName: '',
  surname: '',
  nationality: '',
  email: '',
  phoneNumber: '',
  passport: 0,
  acceptsTandC: false,
}

const setUserNameCase = (
  state: UserState,
  payload: SetUserNamePayload
): UserState => {
  return {
    ...state,
    ...payload,
  }
}

const setUserInformationCase = (
  state: UserState,
  payload: SetUserInformationPayload
): UserState => {
  return {
    ...state,
    ...payload,
  }
}

const userReducer: UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAME:
      return setUserNameCase(state, action.payload)
    case SET_USER_INFORMATION:
      return setUserInformationCase(state, action.payload)
    default:
      return state
  }
}

export default userReducer
