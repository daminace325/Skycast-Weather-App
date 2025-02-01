import { useRef } from 'react';

type CityInputProps = {
    city: string;
    setCity: (city: string) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
}


export default function CityInput({
    city,
    setCity,
    setLatitude,
    setLongitude,
}: CityInputProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        setLatitude('');
        setLongitude('');
    };

    return (
        <div ref={wrapperRef} className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
                City Name
            </label>
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="e.g., London"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none
                    transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
        </div>
    );
}

