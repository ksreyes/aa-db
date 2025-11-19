import { useEffect, useState } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import Papa from 'papaparse';
import createRasterCanvas from './RasterCanvas.jsx';

export default function RasterOverlay({ filters }) {

    const map = useMap();
    const [points, setPoints] = useState([]);
    
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
    
    useEffect(() => {

        function filterPoints(points) {
            return points.filter(
                (p) => p.admin0 === Number(filters.country) && 
                    p.indicator === Number(filters.indicator) &&
                    p.lead === Number(filters.lead)
            );
        }

        
        let filteredPoints = filterPoints(points);
        if (filteredPoints.length === 0) return;
        
        console.log("Filter country:", filters.country);
        console.log("Filter indicator:", filters.indicator);
        console.log("Filter lead:", filters.lead);
        console.log("Rows:", filteredPoints.length);

        const { canvas, bounds } = createRasterCanvas(
            filteredPoints, 
            {width: 800, height: 800, filters: filters}
        );

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
