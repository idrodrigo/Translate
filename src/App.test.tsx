import { test, expect } from 'vitest'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

test('App works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)
  const textAreaFrom = app.getByPlaceholderText('Enter text')

  await user.type(textAreaFrom, 'hola')
  const result = await app.findByDisplayValue(/hello/i)

  expect(result).toBeTruthy()
})
