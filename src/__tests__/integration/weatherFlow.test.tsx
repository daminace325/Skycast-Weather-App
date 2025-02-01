import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import WeatherContent from '@/components/WeatherContent'
import { useRouter, useSearchParams } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn()
}))

describe('Weather Flow Integration', () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn()
    }
    const mockSearchParams = {
      get: jest.fn().mockImplementation((param) => null),
      has: jest.fn(),
      entries: jest.fn(),
      forEach: jest.fn(),
      keys: jest.fn(),
      values: jest.fn(),
      toString: jest.fn()
    }
    
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(useSearchParams as jest.Mock).mockReturnValue(mockSearchParams)
    
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetches and displays weather data when searching by city', async () => {
    const mockWeatherData = {
      temperature: 20,
      humidity: 65,
      windSpeed: 5,
      description: 'clear sky',
      icon: '01d',
      cityName: 'London',
      country: 'GB',
      timestamp: 1645564800,
      feelsLike: 18
    }

    // Mock the API responses
    ;(global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/api/cities')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            suggestions: [{
              name: 'London',
              country: 'GB'
            }]
          })
        })
      }
      if (url.includes('/api/weather')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockWeatherData)
        })
      }
      return Promise.reject(new Error('Not found'))
    })

    render(<WeatherContent />)

    const cityInput = screen.getByPlaceholderText(/e.g., London/i)
    fireEvent.change(cityInput, { target: { value: 'London' } })

    await waitFor(async () => {
      const suggestion = await screen.findByText('London')
      fireEvent.click(suggestion)
    })

    const getWeatherButton = screen.getByText(/Get Weather/i)
    fireEvent.click(getWeatherButton)

    await waitFor(async () => {
      expect(await screen.findByText(/20.0°/)).toBeInTheDocument()
      expect(await screen.findByText(/65%/)).toBeInTheDocument()
    })
  })
}) 