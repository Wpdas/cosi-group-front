import React from 'react'
import { act } from 'react-dom/test-utils'
import { fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import apiInstance from 'api/apiInstance'
import AppProviders from 'contexts/AppProviders'
import Main from './Main'

test('Go to BASIC_INFO step after having the flight number and surname filled', () => {
  const TestMain = () => (
    <ThemeProvider>
      <AppProviders>
        <Main />
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

  const { getByTestId, getByText } = render(<TestMain />)
  const flightInput = getByTestId('welcome-flight')
  const surnameInput = getByTestId('welcome-surname')
  const submitButton = getByTestId('welcome-submit')

  act(() => {
    fireEvent.change(flightInput, { target: { value: '4597' } })
    fireEvent.change(surnameInput, { target: { value: 'Silva' } })
    fireEvent.click(submitButton)
  })

  setTimeout(() => {
    const basicInfoViewTitle = getByText(/Hi, Silva/i) // Message that is shown in the step BASIC_INFO
    expect(basicInfoViewTitle).toBeInTheDocument()
  }, 0)
})
