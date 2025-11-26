import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import Papa from 'papaparse';
import createRasterCanvas from './RasterCanvas.jsx';
// import countryData from "../countryData.json";

export default function RasterOverlay({ filters }) {

    const map = useMap();
    const [points, setPoints] = useState([]);

    // Parse CSV

    useEffect(() => {
        Papa.parse(`${import.meta.env.BASE_URL}data_test.csv`, {
            download: true,
            header: true,
            complete: (results) => {
                const clean = results.data.map(d => ({
                    ...d,
                    admin0: Number(d.admin0),
                    indicator: Number(d.indicator),
                    lon: Number(d.lon),
                    lat: Number(d.lat),
                    lead: Number(d.lead),
                    v: Number(d.v)
                }));
                setPoints(clean);
            }
        });
    }, []);

    // Overlay raster
    
    useEffect(() => {


        // Don't run until points are loaded
        if (points.length === 0) return;

        const result = createRasterCanvas(points, filters);

        // If no result (e.g. no filtered points), stop
        if (!result) return;

        const { canvas, bounds } = result;

        const raster = L.imageOverlay(canvas.toDataURL(), bounds, {
            opacity: 1,
            interactive: false
        });

        raster.addTo(map);

        return () => {
            raster.remove();
        };

    }, [filters, points, map]);

    return null;
}
