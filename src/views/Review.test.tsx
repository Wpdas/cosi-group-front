import React from 'react'
import { render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import Review from './Review'
import { UserState } from 'contexts/User/types'
import { UserContext } from 'contexts/User'

test('Shows the user details properly', () => {
  const TestReview = (props: { userState: UserState }) => (
    <ThemeProvider>
      <UserContext.Provider
        value={{ state: props.userState, dispatch: () => null }}
      >
        <Review />
      </UserContext.Provider>
    </ThemeProvider>
  )

  const testUserState: UserState = {
    flightNumber: 4587,
    firstName: 'Wenderson',
    surname: 'Silva',
    nationality: 'spain',
    email: 'foo@bar.com',
    phoneNumber: '+5531911111111',
    passport: 459788549784546,
    acceptsTandC: true,
    residence: {
      address: 'Street of the happiness, 57',
    },
  }

  const { getByText } = render(<TestReview userState={testUserState} />)

  const firstName = getByText(/Wenderson/i)
  const surname = getByText(/Silva/i)
  const nationality = getByText(/Spain/i)
  const email = getByText(/foo@bar.com/i)
  const phoneNumber = getByText(/5531911111111/i)
  const passport = getByText(/459788549784546/i)
  const residenceAddress = getByText(/Street of the happiness, 57/i)
  expect(firstName).toBeInTheDocument()
  expect(surname).toBeInTheDocument()
  expect(nationality).toBeInTheDocument()
  expect(email).toBeInTheDocument()
  expect(phoneNumber).toBeInTheDocument()
  expect(passport).toBeInTheDocument()
  expect(residenceAddress).toBeInTheDocument()
})
