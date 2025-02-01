type LatInputProps = {
    latitude: string;
    setLatitude: (latitude: string) => void;
    setCity: (city: string) => void;
}

export default function LatInput({
    latitude,
    setLatitude,
    setCity
}: LatInputProps) {
    return (
        <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-medium mb-2">
                Latitude
            </label>
            <input
                type="text"
                value={latitude}
                onChange={(e) => {
                    setLatitude(e.target.value);
                    setCity('');
                }}
                placeholder="e.g., 51.5074"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none
                    transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
        </div>
    )
}