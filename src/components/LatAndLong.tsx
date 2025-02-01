import LatInput from "./LatInput";
import LongInput from "./LongInput";

type LatAndLongProps = {
    latitude: string;
    longitude: string;
    setLatitude: (latitude: string) => void;
    setLongitude: (longitude: string) => void;
    setCity: (city: string) => void;
}
export default function LatAndLong({
    latitude,
    longitude,
    setLatitude,
    setLongitude,
    setCity
}: LatAndLongProps) {
    return (
        <div>
            <div className="flex gap-4 mb-2">
                <LatInput latitude={latitude} setLatitude={setLatitude} setCity={setCity} />
                <LongInput longitude={longitude} setLongitude={setLongitude} setCity={setCity} />
            </div>
        </div>

    )
}
