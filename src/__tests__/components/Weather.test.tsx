import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Weather from '@/components/Weather'

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

describe('Weather Component', () => {
  beforeEach(() => {
    // Mock clipboard API
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    })
  })

  it('renders weather information correctly', () => {
    render(<Weather {...mockWeatherData} />)
    
    expect(screen.getByText('London, GB')).toBeInTheDocument()
    expect(screen.getByText('20.0°')).toBeInTheDocument()
    expect(screen.getByText('Feels like 18.0°')).toBeInTheDocument()
    expect(screen.getByText('65%')).toBeInTheDocument()
    expect(screen.getByText('5.0 m/s')).toBeInTheDocument()
  })

  it('handles share button click', async () => {
    render(<Weather {...mockWeatherData} />)
    
    const shareButton = screen.getByTitle('Share weather')
    fireEvent.click(shareButton)
    
    expect(navigator.clipboard.writeText).toHaveBeenCalled()
    expect(screen.getByText('Copied to clipboard!')).toBeInTheDocument()
  })
}) 