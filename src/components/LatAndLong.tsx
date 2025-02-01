import LatInput from "./LatInput";
import LongInput from "./LongInput";

export default function LatAndLong() {
    return (
        <div>
            <div className="flex gap-4 mb-2">
                <LatInput />
                <LongInput />
            </div>
        </div>

    )
}
