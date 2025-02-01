import { NextRequest, NextResponse } from 'next/server'
import { GET } from '@/app/api/weather/route'

describe('Weather API', () => {
  beforeEach(() => {
    process.env.OPENWEATHER_API_KEY = 'test-api-key'
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('fetches weather data by city name', async () => {
    const mockWeatherResponse = {
      main: { temp: 20, feels_like: 18, humidity: 65 },
      wind: { speed: 5 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      name: 'London',
      sys: { country: 'GB' },
      dt: 1645564800,
      visibility: 10000
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockWeatherResponse
    })

    const url = new URL('http://localhost:3000/api/weather')
    url.searchParams.set('city', 'London')
    const request = new NextRequest(url)

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toMatchObject({
      temperature: 20,
      cityName: 'London',
      country: 'GB'
    })
  })

  it('handles API errors gracefully', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ message: 'City not found' })
    })

    const url = new URL('http://localhost:3000/api/weather')
    url.searchParams.set('city', 'NonexistentCity')
    const request = new NextRequest(url)

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(404)
    expect(data).toEqual({
      message: 'City not found'
    })
  })
}) 