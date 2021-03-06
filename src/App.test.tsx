import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders the App', () => {
  render(<App />)
  const linkElement = screen.getByText(/Welcome to your web check-in/i)
  expect(linkElement).toBeInTheDocument()
})
