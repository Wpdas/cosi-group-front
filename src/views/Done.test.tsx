import React from 'react'
import { render, screen } from '@testing-library/react'
import Done from './Done'

test('Renders the App', () => {
  render(<Done />)
  const linkElement = screen.getByText(/your check-in is confirmed!/i)
  expect(linkElement).toBeInTheDocument()
})
