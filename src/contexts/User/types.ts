export const SET_USER_NAME = 'user:SET_USER_NAME'
export const SET_USER_INFORMATION = 'user:SET_USER_INFORMATION'

export interface UserState {
  flightNumber: number
  firstName: string
  surname: string
  nationality: string
  email: string
  phoneNumber: string
  passport: number
  acceptsTandC: boolean
  residence?: {
    country?: string
    city?: string
    address?: string
  }
  passportExpiryDate?: Date
  birthDate?: Date
  birthPlace?: string
  passportDateIssue?: Date
  passportLocationIssue?: {
    country: string
    city: string
  }
}

export interface SetUserNamePayload {
  readonly firstName: string
  readonly surname: string
}
export interface SetUserNameAction {
  type: typeof SET_USER_NAME
  payload: SetUserNamePayload
}

export interface SetUserInformationPayload {
  readonly nationality: string
  readonly email: string
  readonly phoneNumber: string
  readonly passport: number
  readonly acceptsTandC: boolean
  readonly residence?: {
    country?: string
    city?: string
    address?: string
  }
  readonly passportExpiryDate?: Date
  readonly birthDate?: Date
  readonly birthPlace?: string
  readonly passportDateIssue?: Date
  readonly passportLocationIssue?: {
    country: string
    city: string
  }
}
export interface SetUserInformationAction {
  type: typeof SET_USER_INFORMATION
  payload: SetUserInformationPayload
}

export type UserReducerActionTypes =
  | SetUserNameAction
  | SetUserInformationAction

export type UserReducer = (
  state: UserState,
  action: UserReducerActionTypes
) => UserState
