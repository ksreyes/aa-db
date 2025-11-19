import { useMap } from "react-leaflet";
import { useEffect } from "react";
import countryData from "../countryData.json";

export default function MapCenter({ filters }) {
    
    const map = useMap();

    useEffect(() => {
        map.flyToBounds(
            countryData[filters.country].bounds, 
            { padding: [0, 0] }
        );
    }, [filters.country, map]);

    return null;
}
