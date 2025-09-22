import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { Input, InputField } from './Input'

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveClass('input')
  })

  it('accepts user input', async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText('Type here')
    
    await user.type(input, 'Hello World')
    expect(input).toHaveValue('Hello World')
  })

  it('can be disabled', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-input" placeholder="Custom" />)
    const input = screen.getByPlaceholderText('Custom')
    expect(input).toHaveClass('custom-input')
  })
})

describe('InputField', () => {
  it('renders with label', () => {
    render(<InputField label="Username" placeholder="Enter username" />)
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument()
  })

  it('renders with description', () => {
    render(
      <InputField 
        label="Email" 
        description="We'll never share your email"
        placeholder="Enter email"
      />
    )
    
    expect(screen.getByText("We'll never share your email")).toBeInTheDocument()
  })

  it('shows error message when provided', () => {
    render(
      <InputField 
        label="Password"
        errorMessage="Password is required"
        placeholder="Enter password"
        isInvalid
      />
    )
    
    expect(screen.getByText('Password is required')).toBeInTheDocument()
  })

  it('associates label with input', () => {
    render(<InputField label="Full Name" placeholder="Enter your name" />)
    
    const input = screen.getByLabelText('Full Name')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('placeholder', 'Enter your name')
  })

  it('applies field className', () => {
    render(
      <InputField 
        className="custom-field" 
        label="Test"
        placeholder="Test input"
        data-testid="input-field"
      />
    )
    
    const field = screen.getByTestId('input-field')
    expect(field).toHaveClass('custom-field')
  })
})
