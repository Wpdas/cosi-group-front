import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Container from 'components/Container'
import Loading from 'components/Loading'
import { RequestStatusContext } from './contexts/RequestStatus'
import Main from 'views/Main'

const AppRoutes: React.FC = () => {
  const { requestStatus } = useContext(RequestStatusContext)

  if (requestStatus === 'loading') {
    return <Loading />
  }

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default AppRoutes
