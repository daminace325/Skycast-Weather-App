'use client'

import { lazy } from 'react';
import { ClipLoader } from 'react-spinners';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CityInput from './CityInput';
import ORdivider from './ORdivider';
import LatAndLong from './LatAndLong';
import GetWeatherButton from './GetWeatherButton';
import GetLocationButton from './GetLocationButton';
import ErrorMessage from './ErrorMessage';
import { WeatherData } from '@/weather';


const Weather = lazy(() => import('./Weather'));

export default function WeatherContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	
	const [city, setCity] = useState(searchParams.get('city') || '');
	const [latitude, setLatitude] = useState(searchParams.get('lat') || '');
	const [longitude, setLongitude] = useState(searchParams.get('lon') || '');
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLocationLoading, setIsLocationLoading] = useState(false);

	useEffect(() => {
		if (error) {
			setWeatherData(null);
			const timer = setTimeout(() => {
				setError(null);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [error]);

	useEffect(() => {
		if (searchParams.get('city')) {
			fetchWeather('city');
		} else if (searchParams.get('lat') && searchParams.get('lon')) {
			fetchWeather('coords');
		}
	}, []);

	const updateURL = (params: { city?: string; lat?: string; lon?: string } | null) => {
		const url = new URL(window.location.href);
		url.searchParams.delete('city');
		url.searchParams.delete('lat');
		url.searchParams.delete('lon');

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					url.searchParams.set(key, value);
				}
			});
		}

		router.push(url.pathname + url.search);
	};

	const fetchWeather = async (type: 'city' | 'coords' | null) => {
		setIsLoading(true);
		setError(null);

		if (!city.trim() && (!latitude.trim() || !longitude.trim())) {
			alert('Please fill in either a City name or both latitude and longitude of the location');
			setWeatherData(null);
			updateURL(null);
			setIsLoading(false);
			return;
		}

		try {
			const params = type === 'city'
				? `city=${encodeURIComponent(city)}`
				: `lat=${latitude}&lon=${longitude}`;

			const response = await fetch(`/api/weather?${params}`);
			const data = await response.json();

			if (response.ok) {
				setWeatherData(data);
				if (type === 'coords') {
					setCity(data.cityName);
					updateURL({ lat: latitude, lon: longitude });
				} else {
					updateURL({ city });
				}
				setError(null);
			} else {
				setError(data.message);
				setWeatherData(null);
				updateURL(null);
			}
		} catch (err) {
			setError('Failed to fetch weather data');
			setWeatherData(null);
			updateURL(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleLocationClick = (lat: string, lon: string) => {
		setLatitude(lat);
		setLongitude(lon);
		setCity('');
	};

	return (
		<div className="container mx-auto p-6 max-w-2xl">
			<h1 className="text-4xl font-bold mb-4  bg-gradient-to-bl from-blue-600 to-blue-400 bg-clip-text text-transparent leading-normal text-center">
				SkyCast
			</h1>
			<div className="bg-white p-6 rounded-2xl shadow-lg mb-4 border border-white/50">
				<div className="space-y-3">
					<CityInput city={city} setCity={setCity} setLatitude={setLatitude} setLongitude={setLongitude} />
					<ORdivider />
					<LatAndLong latitude={latitude} longitude={longitude} setLatitude={setLatitude} setLongitude={setLongitude} setCity={setCity} />
					<div className="flex gap-4">
						<GetWeatherButton
							onClick={() => {
								if (latitude.trim() && longitude.trim()) {
									fetchWeather('coords');
								} else if (city.trim()) {
									fetchWeather('city');
								} else {
									fetchWeather(null);
								}
							}}
							disabled={isLoading || isLocationLoading}
							isLoading={isLoading}
						/>
						<GetLocationButton
							onClick={handleLocationClick}
							disabled={isLoading || isLocationLoading}
							isLoading={isLocationLoading}
							setLocationLoading={setIsLocationLoading}
						/>
					</div>
				</div>
			</div>

			<Suspense fallback={
				<div className="flex justify-center items-center py-8 ">
					<ClipLoader
						color='#3274f2'
						speedMultiplier={3} />
				</div>
			}>
				{weatherData && <Weather {...weatherData} />}
			</Suspense>

			{error && (
				<ErrorMessage error={error} />
			)}
		</div>
	);
}