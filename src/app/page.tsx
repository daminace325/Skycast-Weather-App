'use client'

import { lazy } from 'react';
import { ClipLoader } from 'react-spinners';
import { Suspense } from 'react';

const WeatherContent = lazy(() => import('@/components/WeatherContent'));

export default function Home() {
	return (
		<Suspense fallback={
			<main className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-white">
				<div className="flex justify-center items-center h-screen">
					<ClipLoader color="#3274f2" size={40} />
				</div>
			</main>
		}>
			<WeatherContent />
		</Suspense>
	);
}