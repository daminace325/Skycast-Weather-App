import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const API_KEY = process.env.OPENWEATHER_API_KEY;

    if (!query) {
        return NextResponse.json({ suggestions: [] });
    }

    try {
        const response = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const data = await response.json();

        const suggestions = data.map((city: any) => ({
            name: city.name,
            country: city.country,
            state: city.state,
        }));

        return NextResponse.json({ suggestions });
    } catch (error) {
        return NextResponse.json(
            { message: 'Failed to fetch city suggestions' },
            { status: 500 }
        );
    }
} 