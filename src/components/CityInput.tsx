export default function CityInput() {

    return (
        <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
                City Name
            </label>
            <input
                type="text"
                
                placeholder="e.g., London"
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-gray-200 
                    focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none
                    transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
        </div>
    );
}

