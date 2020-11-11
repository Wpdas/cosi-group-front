import apiInstance from './apiInstance'

const token = process.env.REACT_APP_API_TOKEN

interface GetUserDataInput {
  flightNumber: number
  surname: string
}

interface GetUserDataResponse {
  data: {
    firstName: string
  }
}

const getUserData = async (input: GetUserDataInput) => {
  const { surname } = input

  const {
    data: { firstName },
  } = await apiInstance.post<{}, GetUserDataResponse>('/', {
    token,
    data: {
      firstName: 'nameFirst',
    },
  })

  return {
    firstName,
    surname,
  }
}

export default getUserData
