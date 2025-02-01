export type WeatherData = {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon?: string;
    cityName: string;
    country: string;
    timestamp: number;
    feelsLike: number;
} 