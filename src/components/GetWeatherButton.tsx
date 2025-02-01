import React from 'react';

export default function GetWeatherButton() {
	return (
		<button
			className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
				disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
				font-medium flex items-center justify-center gap-2"
		>
				Get Weather
		</button>
	);
};