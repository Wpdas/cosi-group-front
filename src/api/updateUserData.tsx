import apiInstance from './apiInstance'

const token = process.env.REACT_APP_API_TOKEN

interface UpdateUserDataInput {
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

interface UpdateUserDataResponse {
  data: {
    updateAt: Date
  }
}

const updateUserData = async (input: UpdateUserDataInput) => {
  const { email } = input // In a real scenario, all the content would be sent
  await apiInstance.post<{}, UpdateUserDataResponse>('/', {
    token,
    parameters: {
      delay: 10,
    },
    data: {
      email,
      updatedAt: 'date',
    },
  })

  return {
    success: true,
  }
}

export default updateUserData
