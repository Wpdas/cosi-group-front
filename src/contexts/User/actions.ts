import {
  SetUserInformationAction,
  SetUserInformationPayload,
  SetUserNameAction,
  SetUserNamePayload,
  SET_USER_INFORMATION,
  SET_USER_NAME,
} from './types'

export const setUserName = (payload: SetUserNamePayload): SetUserNameAction => {
  return {
    type: SET_USER_NAME,
    payload,
  }
}

export const setUserInformation = (
  payload: SetUserInformationPayload
): SetUserInformationAction => {
  return {
    type: SET_USER_INFORMATION,
    payload,
  }
}
