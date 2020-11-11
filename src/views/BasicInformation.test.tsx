import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import { ThemeProvider } from '@chakra-ui/core'
import { act } from 'react-dom/test-utils'
import BasicInformation from './BasicInformation'
import AppProviders from 'contexts/AppProviders'

describe('Basic Information View', () => {
  const TestBasicInformation = () => (
    <ThemeProvider>
      <AppProviders>
        <BasicInformation />
      </AppProviders>
    </ThemeProvider>
  )

  test('Must have defeault inputs', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const firstNameInput = getByTestId('bi-first-name')
    const surnameInput = getByTestId('bi-surname')
    const nationalityInput = getByTestId('bi-nationality')
    const emailInput = getByTestId('bi-email')
    const phoneNumberInput = getByTestId('bi-phone-number')
    const passportInput = getByTestId('bi-passport')
    const acceptsTandCInput = getByTestId('bi-accepts-t-and-c')

    expect(firstNameInput).toBeInTheDocument()
    expect(surnameInput).toBeInTheDocument()
    expect(nationalityInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(phoneNumberInput).toBeInTheDocument()
    expect(passportInput).toBeInTheDocument()
    expect(acceptsTandCInput).toBeInTheDocument()
  })

  test('Must have additional inputs for Austria', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const nationalityInput = getByTestId('bi-nationality')

    act(() => {
      fireEvent.change(nationalityInput, { target: { value: 'austria' } })
    })

    const residenceCountryInput = getByTestId('bi-residence-country')
    const residenceCityInput = getByTestId('bi-residence-city')
    const passportExpiryDateInput = getByTestId('bi-passport-expiry-date')
    expect(residenceCountryInput).toBeInTheDocument()
    expect(residenceCityInput).toBeInTheDocument()
    expect(passportExpiryDateInput).toBeInTheDocument()
  })

  test('Must have additional inputs for Belgium', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const nationalityInput = getByTestId('bi-nationality')

    act(() => {
      fireEvent.change(nationalityInput, { target: { value: 'belgium' } })
    })

    const residenceCountryInput = getByTestId('bi-residence-country')
    const residenceCityInput = getByTestId('bi-residence-city')
    const residenceAddressInput = getByTestId('bi-residence-address')
    const birthDateInput = getByTestId('bi-birth-date')
    expect(residenceCountryInput).toBeInTheDocument()
    expect(residenceCityInput).toBeInTheDocument()
    expect(residenceAddressInput).toBeInTheDocument()
    expect(birthDateInput).toBeInTheDocument()
  })

  test('Must have additional inputs for France', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const nationalityInput = getByTestId('bi-nationality')

    act(() => {
      fireEvent.change(nationalityInput, { target: { value: 'france' } })
    })

    const residenceCountryInput = getByTestId('bi-residence-country')
    const residenceCityInput = getByTestId('bi-residence-city')
    const birthDateInput = getByTestId('bi-birth-date')
    const birthPlaceInput = getByTestId('bi-birth-place')
    expect(residenceCountryInput).toBeInTheDocument()
    expect(residenceCityInput).toBeInTheDocument()
    expect(birthDateInput).toBeInTheDocument()
    expect(birthPlaceInput).toBeInTheDocument()
  })

  test('Must have additional inputs for Greece', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const nationalityInput = getByTestId('bi-nationality')

    act(() => {
      fireEvent.change(nationalityInput, { target: { value: 'greece' } })
    })

    const passportDateIssueInput = getByTestId('bi-passport-date-issue')
    const passportExpiryDateInput = getByTestId('bi-passport-expiry-date')
    const passportLocationCountryInput = getByTestId(
      'bi-passport-location-country'
    )
    const passportLocationCityInput = getByTestId('bi-passport-location-city')
    expect(passportDateIssueInput).toBeInTheDocument()
    expect(passportExpiryDateInput).toBeInTheDocument()
    expect(passportLocationCountryInput).toBeInTheDocument()
    expect(passportLocationCityInput).toBeInTheDocument()
  })

  test('Must have additional inputs for Spain', () => {
    const { getByTestId } = render(<TestBasicInformation />)
    const nationalityInput = getByTestId('bi-nationality')

    act(() => {
      fireEvent.change(nationalityInput, { target: { value: 'spain' } })
    })

    const residenceAddressInput = getByTestId('bi-residence-address')
    expect(residenceAddressInput).toBeInTheDocument()
  })
})
