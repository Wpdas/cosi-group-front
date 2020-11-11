import React, { createRef, FormEvent, useContext, useState } from 'react'
import { Button, Flex, Input, Stack, Text } from '@chakra-ui/core'
import { getUserData } from 'api'
import { UserContext } from 'contexts/User'
import { setUserName } from 'contexts/User/actions'
import { RequestStatusContext } from 'contexts/RequestStatus'
import { StepContext } from 'contexts/Step'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

const Welcome: React.FC = () => {
  const [flight, setFlight] = useState<number>(0)
  const [surname, setSurname] = useState<string>('')
  const [enableSubmit, setEnableSubmit] = useState(false)
  const formRef = createRef<HTMLFormElement>()

  const { dispatch } = useContext(UserContext)
  const { setRequestStatus } = useContext(RequestStatusContext)
  const { setStep } = useContext(StepContext)

  const checkFormValidity = () => {
    setEnableSubmit(formRef.current?.checkValidity() || false)
  }

  const clickSearchHandler = async (e: FormEvent) => {
    e.preventDefault()
    try {
      setRequestStatus('loading')
      const data = await getUserData({ flightNumber: flight, surname })
      dispatch(setUserName(data))
      setRequestStatus('ready')
      setStep('BASIC_INFO')
    } catch {
      setRequestStatus('error')
    }
  }

  return (
    <Flex align="center" justify="center" height="100%">
      <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
        <Text fontSize="xl">Welcome to your web check-in</Text>
        <form
          ref={formRef}
          onChange={checkFormValidity}
          onSubmit={clickSearchHandler}
        >
          <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
            <Input
              data-testid="welcome-flight"
              type="number"
              placeholder="Flight #"
              size="md"
              isRequired
              onChange={(e: ChangeEvent) => setFlight(Number(e.target.value))}
            />
            <Input
              data-testid="welcome-surname"
              placeholder="Surname"
              size="md"
              isRequired
              onChange={(e: ChangeEvent) => setSurname(e.target.value)}
            />
            <Button
              data-testid="welcome-submit"
              variantColor="teal"
              size="md"
              type="submit"
              isDisabled={!enableSubmit}
            >
              Search flight
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}

export default Welcome
