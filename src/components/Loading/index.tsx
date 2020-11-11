import React from 'react'
import { Flex, Spinner } from '@chakra-ui/core'

const Loading: React.FC = () => (
  <Flex align="center" justify="center" height="100vh">
    <Spinner />
  </Flex>
)

export default Loading
