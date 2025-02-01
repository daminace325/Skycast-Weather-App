import { ClipLoader } from 'react-spinners';

type GetLocationButtonProps = {
    onClick: (latitude: string, longitude: string) => void;
    disabled: boolean;
    isLoading: boolean;
    setLocationLoading: (loading: boolean) => void;
}

export default function GetLocationButton({ 
    onClick, 
    disabled, 
    isLoading, 
    setLocationLoading
}: GetLocationButtonProps) {
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLocationLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onClick(
                        position.coords.latitude.toString(),
                        position.coords.longitude.toString()
                    );
                    setLocationLoading(false);
                },
                (error) => {
                    alert('Error getting location: ' + error.message);
                    setLocationLoading(false);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser');
        }
    };

    return (
        <button
            onClick={handleGetLocation}
            disabled={disabled}
            className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:bg-gray-50"
            title="Get current location"
        >
            {isLoading ? (
                <ClipLoader color="#3274f2" size={20} />
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
            )}
        </button>
    );
};