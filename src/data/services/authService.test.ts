import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authService } from './authService'

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue(null)
  })

  describe('login', () => {
    it('successfully logs in with valid credentials', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' }
      
      const user = await authService.login(credentials)
      
      expect(user).toEqual({
        id: '1',
        name: 'John Doe',
        email: 'test@example.com',
        username: 'test',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test@example.com',
      })
    })

    it('throws error for invalid credentials', async () => {
      const credentials = { email: 'error@example.com', password: 'password123' }
      
      await expect(authService.login(credentials)).rejects.toThrow('Invalid credentials')
    })

    it('simulates API delay', async () => {
      const credentials = { email: 'test@example.com', password: 'password123' }
      const startTime = Date.now()
      
      await authService.login(credentials)
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000)
    })

    it('generates username from email', async () => {
      const credentials = { email: 'john.doe@company.com', password: 'password123' }
      
      const user = await authService.login(credentials)
      
      expect(user.username).toBe('john.doe')
    })
  })

  describe('logout', () => {
    it('removes auth token from localStorage', async () => {
      await authService.logout()
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth-token')
    })

    it('simulates API delay', async () => {
      const startTime = Date.now()
      
      await authService.logout()
      const endTime = Date.now()
      
      expect(endTime - startTime).toBeGreaterThanOrEqual(400)
    })
  })

  describe('isAuthenticated', () => {
    it('returns true when auth token exists', () => {
      localStorageMock.getItem.mockReturnValue('mock-token')
      
      expect(authService.isAuthenticated()).toBe(true)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('auth-token')
    })

    it('returns false when auth token does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      expect(authService.isAuthenticated()).toBe(false)
    })
  })

  describe('getCurrentUser', () => {
    it('returns user data when stored', () => {
      const userData = { id: '1', name: 'John Doe', email: 'john@example.com' }
      localStorageMock.getItem.mockReturnValue(JSON.stringify(userData))
      
      const user = authService.getCurrentUser()
      
      expect(user).toEqual(userData)
      expect(localStorageMock.getItem).toHaveBeenCalledWith('current-user')
    })

    it('returns null when no user data stored', () => {
      localStorageMock.getItem.mockReturnValue(null)
      
      const user = authService.getCurrentUser()
      
      expect(user).toBeNull()
    })

    it('handles invalid JSON gracefully', () => {
      localStorageMock.getItem.mockReturnValue('invalid-json')
      
      expect(() => authService.getCurrentUser()).toThrow()
    })
  })

  describe('storeUser', () => {
    it('stores user data and auth token', () => {
      const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
      
      authService.storeUser(user)
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('current-user', JSON.stringify(user))
      expect(localStorageMock.setItem).toHaveBeenCalledWith('auth-token', 'mock-token')
    })
  })
})
