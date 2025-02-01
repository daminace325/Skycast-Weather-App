import CityInput from "./CityInput";
import GetWeatherButton from "./GetWeatherButton";
import LatAndLong from "./LatAndLong";
import ORdivider from "./ORdivider";

export default function WeatherContent() {
    return (
        <div className="container mx-auto p-6 max-w-2xl">
            <h1 className="text-4xl font-bold mb-4  bg-gradient-to-bl from-blue-600 to-blue-400 bg-clip-text text-transparent leading-normal text-center">
                SkyCast
            </h1>
            <div className="space-y-3">
                <CityInput  />
                <ORdivider />
                <LatAndLong />
                <div className="flex gap-4">
                    <GetWeatherButton />
                </div>
            </div>
        </div>
    )
}
