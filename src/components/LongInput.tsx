type LongInputProps = {
    longitude: string;
    setLongitude: (longitude: string) => void;
    setCity: (city: string) => void;
}

export default function LongInput({
    longitude,
    setLongitude,
    setCity
}: LongInputProps) {
    return (
        <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-medium mb-2">
                Longitude
            </label>
            <input
                type="text"
                value={longitude}
                onChange={(e) => {
                    setLongitude(e.target.value);
                    setCity('');
                }}
                placeholder="e.g., -0.1278"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
					focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none
					transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
        </div>
    )
}
