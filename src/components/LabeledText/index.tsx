import { Text } from '@chakra-ui/core'
import React from 'react'

type Props = {
  label: string
  children: React.ReactNode
}

const LabeledText: React.FC<Props> = ({ children, label }) => {
  return (
    <Text fontSize="md">
      <span>{label}:</span> {children}
    </Text>
  )
}

export default LabeledText
