import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../test/test-utils'
import userEvent from '@testing-library/user-event'
import { Button, ButtonDanger, ButtonGroup } from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('button', 'button-size-medium', 'button-variant-primary')
  })

  it('renders with custom variant and size', () => {
    render(<Button variant="neutral" size="small">Small Button</Button>)
    const button = screen.getByRole('button', { name: 'Small Button' })
    expect(button).toHaveClass('button-size-small', 'button-variant-neutral')
  })

  it('renders as link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>)
    const link = screen.getByRole('link', { name: 'Link Button' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/test')
  })

  it('handles click events', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()
    
    render(<Button onPress={handleClick}>Clickable</Button>)
    const button = screen.getByRole('button', { name: 'Clickable' })
    
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('can be disabled', () => {
    render(<Button isDisabled>Disabled Button</Button>)
    const button = screen.getByRole('button', { name: 'Disabled Button' })
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>)
    const button = screen.getByRole('button', { name: 'Custom' })
    expect(button).toHaveClass('custom-class')
  })
})

describe('ButtonDanger', () => {
  it('renders with danger-primary variant by default', () => {
    render(<ButtonDanger>Delete</ButtonDanger>)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toHaveClass('button-variant-danger-primary')
  })

  it('renders with danger-subtle variant', () => {
    render(<ButtonDanger variant="danger-subtle">Remove</ButtonDanger>)
    const button = screen.getByRole('button', { name: 'Remove' })
    expect(button).toHaveClass('button-variant-danger-subtle')
  })

  it('renders as link when href is provided', () => {
    render(<ButtonDanger href="/delete">Delete Link</ButtonDanger>)
    const link = screen.getByRole('link', { name: 'Delete Link' })
    expect(link).toBeInTheDocument()
  })
})

describe('ButtonGroup', () => {
  it('renders with default alignment', () => {
    render(
      <ButtonGroup data-testid="button-group">
        <Button>First</Button>
        <Button>Second</Button>
      </ButtonGroup>
    )
    const group = screen.getByTestId('button-group')
    expect(group).toHaveClass('button-group', 'button-group-align-start')
  })

  it('renders with custom alignment', () => {
    render(
      <ButtonGroup align="center" data-testid="button-group">
        <Button>Centered</Button>
      </ButtonGroup>
    )
    const group = screen.getByTestId('button-group')
    expect(group).toHaveClass('button-group-align-center')
  })

  it('applies custom className', () => {
    render(
      <ButtonGroup className="custom-group" data-testid="button-group">
        <Button>Test</Button>
      </ButtonGroup>
    )
    const group = screen.getByTestId('button-group')
    expect(group).toHaveClass('custom-group')
  })
})
