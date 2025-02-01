import React, { useState } from 'react';
import Image from 'next/image';
import { WeatherData } from '@/types/weather';

export default function Weather({
	temperature,
	humidity,
	windSpeed,
	description,
	icon,
	cityName,
	country,
	timestamp,
	feelsLike
}: WeatherData) {
	const [showCopiedToast, setShowCopiedToast] = useState(false);

	const date = new Date(timestamp * 1000);
	const formattedDate = date.toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const formattedTime = date.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	});

	const handleShare = async () => {
		const url = window.location.href;
		
		if (navigator.share) {
			try {
				await navigator.share({
					title: `Weather in ${cityName}`,
					text: `Check out the weather in ${cityName}: ${temperature}°C, ${description}`,
					url: url
				});
			} catch (error) {
				copyToClipboard(url);
			}
		} else {
			copyToClipboard(url);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setShowCopiedToast(true);
		setTimeout(() => setShowCopiedToast(false), 2000);
	};

	return (
		<div className="bg-white/80 p-6 rounded-2xl shadow-lg border border-white/50 relative">
			<button
				onClick={handleShare}
				className="absolute top-4 right-4 p-2 text-gray-600 hover:text-blue-600 
					transition-colors duration-200 rounded-full hover:bg-blue-50"
				title="Share weather"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
				</svg>
			</button>

			{showCopiedToast && (
				<div className="absolute top-4 right-14 bg-gray-800 text-white px-3 py-1 
					rounded-lg text-sm animate-fade-in-out">
					Copied to clipboard!
				</div>
			)}

			<div className="space-y-8">
				<div className="border-b border-gray-200 pb-4">
					<h2 className="text-3xl font-bold text-gray-800 mb-2">
						{cityName}, {country}
					</h2>
					<div className="text-gray-600">
						<p>{formattedDate}</p>
						<p>{formattedTime}</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-8">
					<div className="flex justify-between items-center">
							<div>
								<div className="text-5xl font-bold text-blue-600">
									{temperature.toFixed(1)}°
								</div>
								<div className="text-gray-500 mt-1">
									Feels like {feelsLike.toFixed(1)}°
								</div>
							</div>
							{icon && (
								<Image
									src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
									alt={description}
									width={100}
									height={100}
									className=""
								/>
							)}
						<p className="text-2xl text-gray-600 capitalize">{description}</p>
					</div>

					<div className="grid grid-cols-3 gap-4">
						<div className="bg-blue-50 p-4 rounded-xl">
							<div className="text-sm text-blue-600 mb-1">Humidity</div>
							<div className="text-2xl font-semibold text-blue-900">
								{humidity}%
							</div>
						</div>

						<div className="bg-blue-50 p-4 rounded-xl">
							<div className="text-sm text-blue-600 mb-1">Wind Speed</div>
							<div className="text-2xl font-semibold text-blue-900">
								{windSpeed.toFixed(1)} m/s
							</div>
						</div>

						<div className="bg-blue-50 p-4 rounded-xl">
							<div className="text-sm text-blue-600 mb-1">Last Updated</div>
							<div className="text-lg font-semibold text-blue-900">
								{formattedTime}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};