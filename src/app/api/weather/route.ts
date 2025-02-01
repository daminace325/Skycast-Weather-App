import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
    const url = city
        ? `${baseUrl}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
        : `${baseUrl}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { message: data.message || 'Failed to fetch weather data' },
                { status: response.status }
            );
        }

        const {
            main: { temp, feels_like, ...mainRest },
            wind: { speed, ...windRest },
            weather: [weatherData],
            name: cityName,
            ...rest
        } = data;

        return NextResponse.json({
            temperature: Math.round(temp),
            windSpeed: Math.round(speed),
            feelsLike: Math.round(feels_like),
            cityName,
            ...mainRest,
            ...windRest,
            ...weatherData,
            ...rest.sys,
            timestamp: rest.dt,
            visibility: Math.round(rest.visibility / 1000),
        });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}