import React, { useContext } from 'react'
import { Button, Flex, Stack, Text, Divider } from '@chakra-ui/core'
import LabeledText from 'components/LabeledText'
import { UserContext } from 'contexts/User'
import { StepContext } from 'contexts/Step'
import { updateUserData } from 'api'
import { RequestStatusContext } from 'contexts/RequestStatus'

const Review: React.FC = () => {
  const { state } = useContext(UserContext)
  const { setStep } = useContext(StepContext)
  const { setRequestStatus } = useContext(RequestStatusContext)

  const {
    firstName,
    surname,
    nationality,
    email,
    phoneNumber,
    residence,
    passport,
    passportExpiryDate,
    passportDateIssue,
    passportLocationIssue,
    birthDate,
    birthPlace,
  } = state

  const clickBackHandler = () => {
    setStep('BASIC_INFO')
  }

  const clickContinueHandler = async () => {
    try {
      setRequestStatus('loading')
      await updateUserData(state)
      setRequestStatus('ready')
      setStep('DONE')
    } catch {
      setRequestStatus('error')
    }
  }

  return (
    <Flex align="center" justify="center" height="100%" direction="column">
      <Stack spacing={4} minWidth={['90%', '50%', '35%', '25%']}>
        <Text fontSize="xl">Please review your information</Text>
        <LabeledText label="Name">
          {firstName} {surname}
        </LabeledText>
        <LabeledText label="Nationality">
          <span style={{ textTransform: 'capitalize' }}>{nationality}</span>
        </LabeledText>
        <LabeledText label="Email">{email}</LabeledText>
        <LabeledText label="Phone number">{phoneNumber}</LabeledText>
        {(residence?.country || residence?.city || residence?.address) && (
          <>
            <Divider />
            <Text fontWeight="bold">Residence:</Text>
          </>
        )}
        {residence?.country && (
          <LabeledText label="Country">{residence?.country}</LabeledText>
        )}
        {residence?.city && (
          <LabeledText label="City">{residence?.city}</LabeledText>
        )}
        {residence?.address && (
          <LabeledText label="Address">{residence?.address}</LabeledText>
        )}
        <Divider />
        <Text fontWeight="bold">Passport:</Text>
        <LabeledText label="Passport #">{passport}</LabeledText>
        {passportExpiryDate && (
          <LabeledText label="Expiry date">
            {passportExpiryDate?.toLocaleString()}
          </LabeledText>
        )}
        {passportDateIssue && (
          <LabeledText label="Date of issue">
            {passportDateIssue.toLocaleString()}
          </LabeledText>
        )}
        {passportLocationIssue?.country && (
          <LabeledText label="Country of issue">
            {passportLocationIssue?.country}
          </LabeledText>
        )}
        {passportLocationIssue?.city && (
          <LabeledText label="City of issue">
            {passportLocationIssue?.city}
          </LabeledText>
        )}

        {(birthPlace || birthDate) && (
          <>
            <Divider />
            <Text fontWeight="bold">Birth:</Text>
          </>
        )}
        {birthDate && (
          <LabeledText label="Birth date">
            {birthDate?.toLocaleString()}
          </LabeledText>
        )}
        {birthPlace && (
          <LabeledText label="Birth place">
            {birthPlace?.toLocaleString()}
          </LabeledText>
        )}
        <Divider />
        <Flex width="100%" justify="space-between">
          <Button size="md" width="46%" onClick={clickBackHandler}>
            Back
          </Button>
          <Button
            variantColor="teal"
            size="md"
            width="46%"
            onClick={clickContinueHandler}
          >
            Continue
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}

export default Review
