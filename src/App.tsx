import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { CSSReset, ThemeProvider } from '@chakra-ui/core'
import AppRoutes from './AppRoutes'
import AppProviders from 'contexts/AppProviders'

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppProviders>
          <CSSReset />
          <AppRoutes />
        </AppProviders>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
