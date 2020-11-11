import React, {
  createRef,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  Select,
  Checkbox,
  Divider,
} from '@chakra-ui/core'
import { UserContext } from 'contexts/User'
import { setUserInformation } from 'contexts/User/actions'
import { StepContext } from 'contexts/Step'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type Countries = 'austria' | 'belgium' | 'france' | 'greece' | 'spain' | ''
type ExtraFields =
  | 'residenceCountry'
  | 'residenceCity'
  | 'passportExpiryDate'
  | 'residenceAddress'
  | 'birthDate'
  | 'birthPlace'
  | 'passportDateIssue'
  | 'passportLocationIssue'

const extraFields = {
  austria: ['residenceCountry', 'residenceCity', 'passportExpiryDate'],
  belgium: [
    'residenceCountry',
    'residenceCity',
    'residenceAddress',
    'birthDate',
  ],
  france: ['residenceCountry', 'residenceCity', 'birthDate', 'birthPlace'],
  greece: ['passportExpiryDate', 'passportDateIssue', 'passportLocationIssue'],
  spain: ['residenceAddress'],
}

const BasicInformation: React.FC = () => {
  const { dispatch, state } = useContext(UserContext)

  const { setStep } = useContext(StepContext)

  // Fields
  const [nationality, setNationality] = useState<Countries>(
    state.nationality as Countries
  )
  const [email, setEmail] = useState(state.email)
  const [phoneNumber, setPhoneNumber] = useState(state.phoneNumber)
  const [residenceCountry, setResidenceCountry] = useState(
    state.residence?.country
  )
  const [residenceCity, setResidenceCity] = useState(state.residence?.city)
  const [residenceAddress, setResidenceAddress] = useState(
    state.residence?.address
  )
  const [passportNumber, setPassportNumber] = useState(state.passport)
  const [passportDateIssue, setPassportDateIssue] = useState<Date | undefined>(
    state.passportDateIssue
  )
  const [
    passportLocationIssueCountry,
    setPassportLocationIssueCountry,
  ] = useState<string>(state.passportLocationIssue?.country || '')
  const [passportLocationIssueCity, setPassportLocationIssueCity] = useState<
    string
  >(state.passportLocationIssue?.city || '')
  const [passportExpiryDate, setPassportExpiryDate] = useState<
    Date | undefined
  >(state.passportExpiryDate)
  const [birthDate, setBirthDate] = useState<Date | undefined>(state.birthDate)
  const [birthPlace, setBirthPlace] = useState(state.birthPlace)
  const [acceptsTandC, setAcceptsTandC] = useState(state.acceptsTandC)

  const [otherFields, setOtherFields] = useState<string[]>([])
  const [enableSubmit, setEnableSubmit] = useState(false)
  const formRef = createRef<HTMLFormElement>()

  const checkFormValidity = () => {
    const isFormValid = formRef.current?.checkValidity() || false
    setEnableSubmit(isFormValid && acceptsTandC)
  }

  const selectNationalityHandler = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currentNationality = e.target.value as Countries

    if (currentNationality !== nationality) {
      setTimeout(() => {
        setEnableSubmit(false)
        formRef.current?.checkValidity()
      }, 0)
    }

    setNationality(currentNationality)

    switch (currentNationality) {
      case 'austria':
        setOtherFields(extraFields.austria)
        break
      case 'belgium':
        setOtherFields(extraFields.belgium)
        break
      case 'france':
        setOtherFields(extraFields.france)
        break
      case 'greece':
        setOtherFields(extraFields.greece)
        break
      case 'spain':
        setOtherFields(extraFields.spain)
        break
      default:
        setOtherFields([])
    }
  }

  useEffect(() => {
    switch (nationality) {
      case 'austria':
        setOtherFields(extraFields.austria)
        break
      case 'belgium':
        setOtherFields(extraFields.belgium)
        break
      case 'france':
        setOtherFields(extraFields.france)
        break
      case 'greece':
        setOtherFields(extraFields.greece)
        break
      case 'spain':
        setOtherFields(extraFields.spain)
        break
      default:
        setOtherFields([])
    }
  }, [nationality])

  const showField = useCallback(
    (filterKey: ExtraFields) => {
      return otherFields.indexOf(filterKey) !== -1
    },
    [otherFields]
  )

  const acceptsTandCHandler = (e: ChangeEvent) => {
    // Wait for the form to be updated
    setTimeout(() => {
      const isFormValid = formRef.current?.checkValidity() || false
      setAcceptsTandC(e.target.checked)
      setEnableSubmit(isFormValid && e.target.checked)
    }, 0)
  }

  const clickContinueHandler = async (e: FormEvent) => {
    e.preventDefault()

    dispatch(
      setUserInformation({
        nationality,
        email,
        phoneNumber,
        passport: passportNumber,
        acceptsTandC,
        ...(residenceAddress || residenceCity || residenceCountry
          ? {
              residence: {
                country: residenceCountry,
                city: residenceCity,
                address: residenceAddress,
              },
            }
          : {}),
        ...(passportExpiryDate ? { passportExpiryDate } : {}),
        ...(birthDate ? { birthDate } : {}),
        ...(birthPlace ? { birthPlace } : {}),
        ...(passportDateIssue ? { passportDateIssue } : {}),
        ...(passportLocationIssueCity || passportLocationIssueCountry
          ? {
              passportLocationIssue: {
                country: passportLocationIssueCountry,
                city: passportLocationIssueCity,
              },
            }
          : {}),
      })
    )

    setStep('REVIEW')
  }

  return (
    <Flex
      align="center"
      justify="center"
      marginTop={8}
      marginBottom={8}
      direction="column"
    >
      <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
        <Text fontSize="xl">Hi, {state.surname}!</Text>
        <form
          ref={formRef}
          onChange={checkFormValidity}
          onSubmit={clickContinueHandler}
        >
          <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
            <Input
              data-testid="bi-first-name"
              type="text"
              placeholder="First name"
              size="md"
              defaultValue={state.firstName}
              isDisabled
            />
            <Input
              data-testid="bi-surname"
              type="text"
              placeholder="Surname"
              size="md"
              defaultValue={state.surname}
              isDisabled
            />
            <Select
              data-testid="bi-nationality"
              placeholder="Nationality"
              size="md"
              onChange={selectNationalityHandler}
              defaultValue={state.nationality}
              isRequired
            >
              <option value="austria">Austria</option>
              <option value="belgium">Belgium</option>
              <option value="france">France</option>
              <option value="greece">Greece</option>
              <option value="spain">Spain</option>
            </Select>
            <Input
              data-testid="bi-email"
              type="email"
              placeholder="E-mail"
              size="md"
              isRequired
              defaultValue={state.email}
              onChange={(e: ChangeEvent) => setEmail(e.target.value)}
            />
            <Input
              data-testid="bi-phone-number"
              type="text"
              placeholder="Phone number"
              size="md"
              isRequired
              defaultValue={state.phoneNumber}
              onChange={(e: ChangeEvent) => setPhoneNumber(e.target.value)}
            />

            {/* RESIDENCE */}
            {(showField('residenceCountry') ||
              showField('residenceCity') ||
              showField('residenceAddress')) && (
              <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
                <Divider />
                <Text>Residence:</Text>
              </Stack>
            )}

            {showField('residenceCountry') && (
              <Input
                data-testid="bi-residence-country"
                type="text"
                placeholder="Country"
                size="md"
                isRequired
                defaultValue={state.residence?.country}
                onChange={(e: ChangeEvent) =>
                  setResidenceCountry(e.target.value)
                }
              />
            )}

            {showField('residenceCity') && (
              <Input
                data-testid="bi-residence-city"
                type="text"
                placeholder="City"
                size="md"
                isRequired
                defaultValue={state.residence?.city}
                onChange={(e: ChangeEvent) => setResidenceCity(e.target.value)}
              />
            )}

            {showField('residenceAddress') && (
              <Input
                data-testid="bi-residence-address"
                type="text"
                placeholder="Address"
                size="md"
                isRequired
                defaultValue={state.residence?.address}
                onChange={(e: ChangeEvent) =>
                  setResidenceAddress(e.target.value)
                }
              />
            )}

            {(showField('residenceCountry') ||
              showField('residenceCity') ||
              showField('residenceAddress')) && <Divider />}

            <Text>Passport number:</Text>
            <Input
              data-testid="bi-passport"
              placeholder="Passport #"
              size="md"
              isRequired
              defaultValue={state.passport !== 0 ? state.passport : ''}
              type="number"
              onChange={(e: ChangeEvent) =>
                setPassportNumber(Number(e.target.value))
              }
            />

            {/* PASSPORT DATE ISSUE */}
            {showField('passportDateIssue') && (
              <Stack spacing={4}>
                <Text>Passport date of issue:</Text>
                <Input
                  data-testid="bi-passport-date-issue"
                  placeholder="Passport date of issue"
                  size="md"
                  type="date"
                  isRequired
                  defaultValue={state.passportDateIssue?.getTime()}
                  onChange={(e: ChangeEvent) =>
                    setPassportDateIssue(new Date(e.target.value))
                  }
                />
              </Stack>
            )}

            {/* PASSPORT LOCATION ISSUE */}
            {showField('passportLocationIssue') && (
              <Stack spacing={4}>
                <Text>Passport location of issue:</Text>
                <Input
                  data-testid="bi-passport-location-country"
                  style={{ textTransform: 'capitalize' }}
                  placeholder="Passport country"
                  size="md"
                  type="text"
                  isRequired
                  defaultValue={state.passportLocationIssue?.country}
                  onChange={(e: ChangeEvent) =>
                    setPassportLocationIssueCountry(e.target.value)
                  }
                />
                <Input
                  data-testid="bi-passport-location-city"
                  style={{ textTransform: 'capitalize' }}
                  placeholder="Passport city"
                  size="md"
                  type="text"
                  isRequired
                  defaultValue={state.passportLocationIssue?.city}
                  onChange={(e: ChangeEvent) =>
                    setPassportLocationIssueCity(e.target.value)
                  }
                />
              </Stack>
            )}

            {/* PASSPORT EXPIRY DATE */}
            {showField('passportExpiryDate') && (
              <Stack spacing={4}>
                <Text>Passport expiry date:</Text>
                <Input
                  data-testid="bi-passport-expiry-date"
                  placeholder="Passport expiry date"
                  size="md"
                  type="date"
                  isRequired
                  onChange={(e: ChangeEvent) =>
                    setPassportExpiryDate(new Date(e.target.value))
                  }
                />
              </Stack>
            )}

            {/* BIRTH */}
            {showField('birthDate') && (
              <Stack spacing={4}>
                <Text>Birth date:</Text>
                <Input
                  data-testid="bi-birth-date"
                  placeholder="Birth date"
                  size="md"
                  type="date"
                  isRequired
                  defaultValue={state.birthDate?.getTime()}
                  onChange={(e: ChangeEvent) =>
                    setBirthDate(new Date(e.target.value))
                  }
                />
              </Stack>
            )}

            {showField('birthPlace') && (
              <Stack spacing={4}>
                <Text>Birth place:</Text>
                <Input
                  data-testid="bi-birth-place"
                  placeholder="Birth place"
                  size="md"
                  type="text"
                  isRequired
                  defaultValue={state.birthPlace}
                  onChange={(e: ChangeEvent) => setBirthPlace(e.target.value)}
                />
              </Stack>
            )}

            <Checkbox
              data-testid="bi-accepts-t-and-c"
              variantColor="green"
              size="md"
              defaultIsChecked={state.acceptsTandC}
              onChange={acceptsTandCHandler}
            >
              Accepts T&C
            </Checkbox>
            <Button
              variantColor="teal"
              size="md"
              type="submit"
              isDisabled={!enableSubmit}
            >
              Continue
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}

export default BasicInformation
