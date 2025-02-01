import React from 'react';

type GetWeatherButtonProps = {
	onClick: () => void;
	disabled: boolean;
	isLoading: boolean;
}

export default function GetWeatherButton({
	onClick,
	disabled,
	isLoading
}: GetWeatherButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className="w-full px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 
				disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200
				font-medium flex items-center justify-center gap-2"
		>
			{isLoading ? (
				<>
					Loading...
				</>
			) : (
				'Get Weather'
			)}
		</button>
	);
};