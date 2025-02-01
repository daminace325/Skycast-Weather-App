import { useState, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import { ClipLoader } from 'react-spinners';

type CityInputProps = {
    city: string;
    setCity: (city: string) => void;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
}

type Suggestion = {
    name: string;
    country: string;
    state?: string;
}

export default function CityInput({
    city,
    setCity,
    setLatitude,
    setLongitude,
}: CityInputProps) {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = debounce(async (query: string) => {
        if (!query.trim()) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`/api/cities?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setSuggestions(data?.suggestions || []);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, 300);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCity(value);
        setLatitude('');
        setLongitude('');
        setShowSuggestions(true);
        fetchSuggestions(value);
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setCity(`${suggestion.name}, ${suggestion.country}`);
        setShowSuggestions(false);
        setSuggestions([]);
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
            
            {showSuggestions && suggestions && (suggestions.length > 0 || isLoading) && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-200 max-h-52 overflow-auto">
                    {isLoading ? (
                        <div className='flex justify-center items-center h-full my-2'>
                            <ClipLoader color='#1089df' size={30} />
                        </div>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <button
                                key={index}
                                className="w-full text-left px-4 py-1 hover:bg-blue-50 
                                    transition-colors duration-150 text-gray-700"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                <div className="font-medium">{suggestion.name}</div>
                                <div className="text-sm text-gray-500">
                                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}