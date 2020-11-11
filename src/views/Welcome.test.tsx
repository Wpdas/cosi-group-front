import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import { act } from 'react-dom/test-utils'
import apiInstance from 'api/apiInstance'
import * as userActions from 'contexts/User/actions'
import Welcome from './Welcome'
import AppProviders from 'contexts/AppProviders'

test('Update the user name', () => {
  const TestWelcome = () => (
    <ThemeProvider>
      <AppProviders>
        <Welcome />
      </AppProviders>
    </ThemeProvider>
  )

  jest.spyOn(apiInstance, 'post').mockReturnValue(
    Promise.resolve({
      data: {
        firstName: 'José',
      },
    })
  )

  const setUserNameActionSpy = jest.spyOn(userActions, 'setUserName')

  const { getByTestId } = render(<TestWelcome />)
  const flightInput = getByTestId('welcome-flight')
  const surnameInput = getByTestId('welcome-surname')
  const submitButton = getByTestId('welcome-submit')

  act(() => {
    fireEvent.change(flightInput, { target: { value: '5796' } })
    fireEvent.change(surnameInput, { target: { value: 'Oliveira' } })
    fireEvent.click(submitButton)
  })

  setTimeout(() => {
    expect(setUserNameActionSpy).toBeCalledWith({
      firstName: 'José',
      surname: 'Oliveira',
    })
  }, 0)
})
